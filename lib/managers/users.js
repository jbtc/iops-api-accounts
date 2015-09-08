'use strict';

let Promise = require('bluebird');
let AbstractManager = require('./abstract');
let Hat = require('hat');
let Assert = require('assert-plus');
let Moment = require('moment');
let Bcrypt = Promise.promisifyAll(require('bcryptjs'));
let _ = require('lodash');

const SALT_WORK_FACTOR = 10;

class UsersManager extends AbstractManager {

  constructor() {
    super('users');
  }

  /**
   * Find by account id
   * @param {string} accountId
   * @returns {*}
   */
  findByAccountId(accountId) {
    return this.find({ accounts: this.parse(accountId) });
  }

  findByEmailAndPassword(email, password){
    return this.collection.findOneAsync({ email: email})
      .then(function(user) {
        if(user){
          if(Bcrypt.compareSync(password, user.passwordHashed)){
            return Promise.resolve(user);
          }
        }

        return Promise.reject('Email or password not found');
      });
  }

  /**
   * Create a user
   * @param {object} user
   * @returns {*}
   */
  create(user) {
    let self = this;
    Assert.object(user, 'user');
    user = UsersManager._applyDefaults(user);
    return this.collection.findOneAsync({ email: user.email })
      .then(function(u) {
        if (!u) {
          return self._hash(user.password)
            .then(function(hashedPassword) {
              delete user.password;
              user.passwordHashed = hashedPassword;
              return self.collection.saveAsync(user);
            });
        }
        else {
          return Promise.reject(new Error('Email already used'));
        }
      });
  }

  /**
   * Update a user
   * @param {object} user
   * @returns {*}
   */
  update(user) {
    let self = this;
    Assert.object(user, 'updated');
    if (user.password) {
      return self._hash(user.password)
        .then(function(hashedPassword) {
          delete user.password;
          user.passwordHashed = hashedPassword;
          return self.collection.saveAsync(user);
        });
    } else {
      return self.super.update(user);
    }
  }

  patch(id, properties) {
    let self = this;
    //db.users.update({_id  : ObjectId(id)}, {$set: updateObject});
    return this.findById(id)
      .then(function(user) {
        if (user) {
          user = _.assign(user, properties);
          if (properties.password) {
            return self._hash(properties.password)
              .then(function(hashedPassword) {
                user.passwordHashed = hashedPassword;
                return self.super.save(user);
              });
          } else {
            return self.super.save(user);
          }
        } else {
          throw new Error('Not found');
        }
      });
  }

  addAccountToUser(accountId, userId) {
    var self = this;
    return this.findById(userId)
      .then(function(user) {
        user.accounts.push(accountId);
        return self.collection.saveAsync(user);
      });
  }

  removeAccountFromUser(accountId, userId) {
    let self = this;
    return this.findById(userId)
      .then(function(user) {
        user.accounts = _.without(user.accounts, this.parse(accountId));
        return self.collection.saveAsync(user);
      });
  }

  //_hashPassword(user) {
  //  return Bcrypt.genSaltAsync(SALT_WORK_FACTOR)
  //    .then(function(salt) {
  //      return Bcrypt.hashAsync(user.password, salt)
  //        .then(function(hash) {
  //          delete user.password;
  //          user.passwordHashed = hash;
  //          return Promise.resolve(user);
  //        });
  //    });
  //}

  _hash(password) {
    return Bcrypt.genSaltAsync(SALT_WORK_FACTOR)
      .then(function(salt) {
        return Bcrypt.hashAsync(password, salt);
      });
  }

  static _applyDefaults(user) {
    return _.defaults(user, {
      token: Hat(),
      active: true,
      claims: [],
      accounts: [],
      createdAt: Moment().utc().toDate()
    });
  }
}

module.exports = UsersManager;