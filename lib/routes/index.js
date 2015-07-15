'use strict';
var _ = require('lodash');

var accounts = require('./accounts');
var users = require('./users');
var sessions = require('./sessions');
var systems = require('./systems');


var routes = _.union(accounts, users, sessions, systems);
module.exports = routes;
