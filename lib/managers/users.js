'use strict';

var Promise = require('bluebird');
var AbstractManager = require('./abstract');
var Util = require('util');
var Assert = require('assert-plus');

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
  return this.find({ accountId: accountId });
};


module.exports = UsersManger;