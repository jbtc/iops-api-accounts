'use strict';

var Util = require('util');
var AbstractManager = require('./abstract');
var Assert = require('assert-plus');
var _ = require('lodash');
var Hat = require('hat');

function AccountsManager() {
  AbstractManager.call(this, 'accounts');
}

Util.inherits(AccountsManager, AbstractManager);

AccountsManager.prototype.find = function(predicate) {
  predicate = predicate || {};
  return this.collection.findAsync(predicate);
};

AccountsManager.prototype.findById = function(id) {
  Assert.string(id, 'id');
  return this.collection.findOneAsync({ _id: this.toObjectId(id) });
};

AccountsManager.prototype.create = function(account) {
  Assert.object(account, 'account');
  account = _.defaults(account, { token: Hat(), active: true });
  return this.collection.saveAsync(account);
};

AccountsManager.prototype.update = function(id, updated) {
  Assert.object(updated, 'updated');
  return this.collection.updateAsync({ _id: this.toObjectId(id) }, updated);
};

AccountsManager.prototype.patch = function(id, properties) {
  var self = this;
  return this.findById(id)
    .then(function(account) {
      if (account) {
        account = _.assign(account, properties);
        return self.collection.saveAsync(account);
      } else {
        throw new Error('Not found');
      }
    });
};

AccountsManager.prototype.remove = function(id) {
  Assert.string(id, 'id');
  return this.collection.removeAsync({ _id: this.toObjectId(id) }, true);
};

module.exports = AccountsManager;