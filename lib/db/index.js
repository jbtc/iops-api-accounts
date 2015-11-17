'use strict';

let r = require('../../config').r;

module.exports = {
  r: r,
  accounts: r.table('users'),
  users: r.table('users'),
  claims: r.table('claims'),
  roles: r.table('roles')
};
