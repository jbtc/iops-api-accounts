'use strict';

var Promise = require('bluebird');
var AbstractManager = require('./abstract');
var Util = require('util');
var Hat = require('hat');
var Assert = require('assert-plus');

var Bcrypt = Promise.promisifyAll(require('bcryptjs'));

var SALT_WORK_FACTOR = 10;

function UsersManger() {
  AbstractManager.call(this, 'users');
}

Util.inherits(UsersManger, AbstractManager);

/**
 * Find users by a predicate
 * @param {object} predicate
 */
UsersManger.prototype.find = function(predicate) {
  predicate = predicate || {};
  return this.collection.findAsync(predicate);
};

/**
 * Find users by Account Id
 * @param {string} accountId
 */
UsersManger.prototype.findByAccountId = function(accountId) {
  Assert.string(accountId, accountId);
  return this.find({ accounts: this.toObjectId(accountId) });
};

UsersManger.prototype.create = function(user) {
  var self = this;
  Assert.object(user, 'user');
  user = _.defaults(user, { token: Hat(), active: true, claims: [], accounts: [] });
  return this.hashPassword(user)
      .then(function(user) {
        return self.collection.saveAsync(user);
      });
};

UsersManger.prototype.update = function(id, updated) {
  var self = this;
  Assert.object(updated, 'updated');
  if (updated.password) {
    return this.hashPassword(updated)
        .then(function(user) {
          return self.collection.updateAsync({ _id: this.toObjectId(id) }, user);
        });
  } else {
    return this.collection.updateAsync({ _id: this.toObjectId(id) }, user);
  }
};

UsersManger.prototype.patch = function(id, properties) {
  var self = this;
  return this.findById(id)
      .then(function(user) {
        if (user) {
          user = _.assign(user, properties);
          if (properties.password) {
            return self.hashPassword(user)
                .then(function(user) {
                  self.collection.saveAsync(user);
                });
          } else {
            return self.collection.saveAsync(user);
          }
        } else {
          throw new Error('Not found');
        }
      });
};

UsersManger.prototype.remove = function(id) {
  Assert.string(id, 'id');
  return this.collection.removeAsync({ _id: this.toObjectId(id) }, true);
};

UsersManger.prototype.hashPassword = function(user) {
  return Bcrypt.genSaltAsync(SALT_WORK_FACTOR)
      .then(function(salt) {
        return Bcrypt.hashAsync(user.password, salt)
            .then(function(hash) {
              delete user.password;
              user.passwordHashed = hash;
              return Promise.resolve(user);
            });
      });
};


module.exports = UsersManger;