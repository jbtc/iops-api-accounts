'use strict';

var Promise = require('bluebird');
var Util = require('util');
var AbstractManager = require('./abstract');

function AccountsManager() {
  AbstractManager.call(this, 'accounts');
}

Util.inherits(AccountsManager, AbstractManager);


AccountsManager.prototype.find = function(predicate, options) {

};

module.exports = AccountsManager;