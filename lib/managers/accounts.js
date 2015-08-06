'use strict';

let AbstractManager = require('./abstract')
  , Assert = require('assert-plus')
  , _ = require('lodash')
  , Hat = require('hat');

/**
 * Accounts Manager
 */
class AccountsManager extends AbstractManager {

  /**
   * @constructor
   * @public
   */
  constructor() {
    super('accounts');
  }

  /**
   * Create an account
   * @param {object} account
   * @returns {*}
   */
  create(account) {
    account = _.defaults(account, { token: Hat(), active: true });
    return super.create(account);
  }

  /**
   * Patch a user
   * @param {string} id
   * @param {object} properties
   * @returns {*}
   */
  patch(id, properties) {
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
  }
}

module.exports = AccountsManager;