'use strict';

let Promise = require('bluebird')
  , AbstractManager = require('./abstract')
  , Hat = require('hat')
  , Assert = require('assert-plus')
  , Moment = require('moment')
  , Bcrypt = Promise.promisifyAll(require('bcryptjs'))
  , _ = require('lodash');


var SALT_WORK_FACTOR = 10;

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
          return self._hashPassword(user)
            .then(function(hashedUser) {
              return self.collection.saveAsync(hashedUser);
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
      return this._hashPassword(user)
        .then(function(user) {
          return self.super.update(user);
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
            return self._hashPassword(user)
              .then(function(user) {
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

  _hashPassword(user) {
    return Bcrypt.genSaltAsync(SALT_WORK_FACTOR)
      .then(function(salt) {
        return Bcrypt.hashAsync(user.password, salt)
          .then(function(hash) {
            delete user.password;
            user.passwordHashed = hash;
            return Promise.resolve(user);
          });
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