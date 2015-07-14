'use strict';

var express = require('express');
var http = require('http');
var config = require('../config');
var bodyParser = require('body-parser');
var util = require('util');
var logger = config.logger;


var systemRoutes = require('./routes/systems');
var accountRoutes = require('./routes/accounts');

var app = express();

app.use(bodyParser.json());

app.use('/v1', systemRoutes);
app.use('/v1/accounts', accountRoutes);

app.get('/', function(req, res) {
  res.status(200).send({ hello: 'world' });
});


var server = http.Server(app);
module.exports = server;