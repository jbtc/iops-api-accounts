'use strict';
var _ = require('lodash');
var accounts = require('./accounts');
var users = require('./users');
var systems = require('./systems');

var routes = _.union(accounts, users, systems);
module.exports = routes;
