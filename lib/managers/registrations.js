'use strict';

var _ = require('lodash')
  , Promise = require('bluebird')
  , UsersManager = require('./users')
  , AccountsManager = require('./accounts');

class RegistrationsManager {
  constructor() {
    this.accounts = new AccountsManager();
    this.users = new UsersManager();
  }

  register(registration) {
    return this.accounts.create(registration.account)
      .then(function(account) {

      });
  }
}


module.exports = RegistrationsManager;