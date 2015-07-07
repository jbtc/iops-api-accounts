'use strict';

var express = require('express');
var config = require('../config');

var app = express();

app.get('/', function(req, res) {
  res.send({ hello: 'world'});
});

var port = config.get('PORT');
var server = app.listen(port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = server;