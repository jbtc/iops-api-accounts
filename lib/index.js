'use strict';

var express = require('express');
var config = require('../config');

var app = express();

app.get('/', function(req, res) {
  res.send(200, { hello: 'world' });
});

var port = config.get('PORT');
var server = app.listen(port, function() {
  console.log('App startd on port: %s', port);
});

module.exports = server;