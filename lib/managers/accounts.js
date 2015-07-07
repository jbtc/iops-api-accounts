'use strict';

var Util = require('util');
var AbstractManager = require('./abstract');

function AccountsManager() {
  AbstractManager.call(this, 'accounts');
}

Util.inherits(AccountsManager, AbstractManager);


module.exports = AccountsManager;