'use strict';
var _ = require('lodash');
var accounts = require('./accounts');
var systems = require('./systems');

var routes = _.union(accounts, systems);
module.exports = routes;
