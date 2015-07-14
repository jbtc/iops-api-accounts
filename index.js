'use strict';
var config = require('./config');
var logger = require('./config/logger');
var util = require('util');
var server = require('./lib');

var port = config.get('PORT');
server.listen(port, function() {
  var host = server.address().address;
  logger.log(2, util.format('Service started at http://%s:%s', host, port));
});