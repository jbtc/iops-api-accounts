'use strict';

var _ = require('lodash')
  , Promise = require('bluebird')
  , UsersManager = require('./users')
  , AccountsManager = require('./accounts');

function RegistrationsManager() {
  this.accounts = new AccountsManager();
  this.users = new UsersManager();
}

/**
 * Create a new account with users
 * @param registration
 * @returns {*}
 */
RegistrationsManager.prototype.register = function(registration) {
  return this.accounts.create(registration.account)
    .then(function(account) {

    });
};

module.exports = RegistrationsManager;