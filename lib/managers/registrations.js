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
    let users = registration.users;
    let self = this;
    return this.accounts.create(registration.account)
      .then(function(account) {
        var promises = [];
        for (var i = 0; i < users.length; i++) {
          var user = users[i];
          user.accounts = [account._id];
          promises.push(self.users.create(user));
        }
        return Promise.all(promises);
      });
  }
}


module.exports = RegistrationsManager;