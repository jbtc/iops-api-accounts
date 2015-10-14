'use strict';

let _ = require('lodash');
let Moment = require('moment');
let Boom = require('boom');
let AbstractManager = require('./abstract');

class AccountManager extends AbstractManager {

  constructor() {
    super('accounts');
  }

  active() {
    return this.filterBy({ isActive: true });
  }

  existsByCode(code) {
    return this.table.filter({ code: this.r.expr(code).upcase() }).isEmpty();
  }

  create(account) {
    account.createdAt = Moment().utc().toDate();
    account.updatedAt = Moment().utc().toDate();
    account.isActive = true;

    return new Promise((resolve) => {
      return this.table.insert(account).run().then((result) => {
        return this.byId(_.first(result.generated_keys)).run().then((user) => {
          return resolve(user);
        });
      });
    });
  }

  update(id, account) {
    account.updatedAt = Moment().utc().toDate();
    return new Promise((resolve, reject) => {
      return this.table.get(id).update(account).run().then((result) => {
        if (result.replaced > 0 || result.unchanged > 0) {
          return this.byId(id).run().then((savedAccount) => {
            return resolve(savedAccount);
          });
        } else {
          return reject(Boom.notFound());
        }
      });
    });
  }
}

module.exports = AccountManager;
