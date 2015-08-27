'use strict';

var AbstractModel = require('./abstract');

class Account extends AbstractModel {

  constructor(account) {
    super(account);
  }

  toDto() {
    return super.toDto(['name', 'isActive']);
  }
}

module.exports = Account;