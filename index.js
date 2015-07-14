'use strict';

var Hapi = require('hapi');
var config = require('./config');
var router = require('./lib/routes');

var server = new Hapi.Server();
server.connection({
  port: config.get('PORT'),
  labels: ['api']
});

server.route(router);

server.register([
  {
    register: require('hapi-routes-status')
  },
  {
    register: require('blipp'),
    options: {}
  },
  {
    register: require('ratify')
  },
  {
    register: require('good'),
    options: {
      opsInterval: 5000,
      reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*', error: '*' }
      }]
    }
  }
], function(err) {
  if (err) throw err;
  if (!module.parent) {
    server.start(function() {
      console.log("Server started", server.info.uri);
    });
  }
});


module.exports = server;