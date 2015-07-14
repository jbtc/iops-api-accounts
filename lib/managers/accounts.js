'use strict';

var Promise = require('bluebird');
var Util = require('util');
var AbstractManager = require('./abstract');
var Assert = require('assert-plus');
var Validator = require('../utils/validator');
var Errors = require('../errors');
var accountSchema = require('../schemas/accounts/account');

function AccountsManager() {
  AbstractManager.call(this, 'accounts');
  this.validator = new Validator();
}

Util.inherits(AccountsManager, AbstractManager);

AccountsManager.prototype.find = function(predicate) {
  predicate = predicate || {};
  return this.collection.findAsync(predicate);
};

AccountsManager.prototype.byId = function(id) {
  Assert.string(id, 'id');
  return this.collection.findONeAsync({ id: id });
};

AccountsManager.prototype.create = function(account) {
  Assert.object(account, 'account');
  var result = this.validator.validate(account, accountSchema);
  if (result.valid) {
    return this.collection.saveAsync(account);
  } else {
    return Promise.reject(new Errors.ValidationError("Account not valid", result.errors));
  }
};

AccountsManager.prototype.update = function(id, updated) {
  Assert.object(updated, 'updated');
  return this.collection.updateAsync({ id: id }, updated);
};

AccountsManager.prototype.remove = function(id) {
  Assert.string(id, 'id');
  return this.collection.removeAsync({ id: id }, true);
};

module.exports = AccountsManager;