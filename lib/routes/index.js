'use strict';

var _ = require('lodash')
  , accounts = require('./accounts')
  , users = require('./users')
  , sessions = require('./sessions')
  , systems = require('./systems')
  , registrations = require('./registrations');


module.exports = _.union(accounts, users, sessions, systems, registrations);
