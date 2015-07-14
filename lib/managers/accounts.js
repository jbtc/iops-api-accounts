'use strict';

var Promise = require('bluebird');
var Util = require('util');
var AbstractManager = require('./abstract');
var Assert = require('assert-plus');
var MongoJs = require('mongojs');

function AccountsManager() {
  AbstractManager.call(this, 'accounts');
}

Util.inherits(AccountsManager, AbstractManager);

AccountsManager.prototype.find = function(predicate) {
  predicate = predicate || {};
  return this.collection.findAsync(predicate);
};

AccountsManager.prototype.byId = function(id) {
  Assert.string(id, 'id');
  return this.collection.findOneAsync({ _id: MongoJs.ObjectId(id) });
};

AccountsManager.prototype.create = function(account) {
  Assert.object(account, 'account');
  return this.collection.saveAsync(account);
};

AccountsManager.prototype.update = function(id, updated) {
  Assert.object(updated, 'updated');
  return this.collection.updateAsync({ _id: MongoJs.ObjectId(id) }, updated);
};

AccountsManager.prototype.remove = function(id) {
  Assert.string(id, 'id');
  return this.collection.removeAsync({ id: id }, true);
};

module.exports = AccountsManager;