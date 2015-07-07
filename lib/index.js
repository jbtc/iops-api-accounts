'use strict';

var express = require('express');
var config = require('../config');
var bodyParser = require('body-parser');

var systemRoutes = require('./routes/systems');

var app = express();

app.use(bodyParser.json());

app.use('/v1/systems', systemRoutes);

app.get('/', function(req, res) {
  res.send(200, { hello: 'world' });
});

var port = config.get('PORT');
var server = app.listen(port, function() {
  console.log('App startd on port: %s', port);
});

module.exports = server;