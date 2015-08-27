'use strict';

let AbstractManager = require('./abstract');
let Assert = require('assert-plus');
let _ = require('lodash');
let Hat = require('hat');
let Moment = require('moment');

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
    let createdAndUpdatedAt = Moment().utc().toDate();
    account = _.defaults(account, { isActive: true, createdAt: createdAndUpdatedAt, updatedAt: createdAndUpdatedAt });
    return super.create(account);
  }

  /**
   * Make sure we set the updated at
   * @param {object} account
   * @returns {Promise}
   */
  update(account) {
    account.updatedAt = Moment().utc().toDate();
    return super.update(account);
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
          }
          else {
            throw new Error('Not found');
          }
        });
  }
}

module.exports = AccountsManager;