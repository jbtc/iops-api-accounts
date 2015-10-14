'use strict';

let Accounts = require('./accounts');
let Users = require('./users');

module.exports = {
  accounts: new Accounts(),
  users: new Users()
};
