'use strict';

var _ = require('lodash')
  , accounts = require('./accounts')
  , users = require('./users')
  , sessions = require('./sessions')
  , registrations = require('./registrations');


module.exports = _.union(accounts, users, sessions, registrations);
