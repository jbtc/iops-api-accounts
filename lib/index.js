'use strict';

var express = require('express');
var http = require('http');
var proxy = require('http-proxy');
var config = require('../config');
var bodyParser = require('body-parser');
var util = require('util');
var logger = config.logger;


var systemRoutes = require('./routes/systems');

var app = express();

app.use(bodyParser.json());
app.use('/v1/systems', systemRoutes);

app.get('/', function(req, res) {
  res.status(200).send({ hello: 'world' });
});

var port = config.get('PORT');
var localhost = '127.0.0.1:' + port;
var proxyOptions = {
  hostnameOnly: true,
  router: {
    'api-accounts.iops.svc.tutum.io': localhost
  }
};

proxyOptions.router[config.get('IOPS_ACCOUNT_PROXY_URL')] = '127.0.0.1:' + port;
if (config.get('NODE_ENV') === 'production') {
  proxy.createServer(proxyOptions).listen(80);
}
logger.log(2, proxyOptions.router);

var server = http.Server(app);
server.listen(port, function() {
  var host = server.address().address;
  logger.log(2, util.format('Service started at http://%s:%s', host, port));
});

module.exports = server;