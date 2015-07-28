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
    register: require('blipp')
  },
  {
    register: require('lout')
  },
  {
    register: require('tv')
  },
  {
    register: require('hapi-auth-jwt2')
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

  var secretKey = config.get('ACCOUNTS_SECRET_KEY');
  //server.auth.strategy('jwt', 'jwt', 'try', {
  //  key: secretKey,
  //  validateFunc: function(decoded, request, callback) {
  //
  //    // do your checks to see if the person is valid
  //    //if (!people[decoded.id]) {
  //    //  return callback(null, false);
  //    //}
  //    //else {
  //    //  return callback(null, true);
  //    //}
  //
  //    return callback(null, false);
  //  }
  //});


  if (!module.parent) {
    server.start(function() {
      console.log("Server started", server.info.uri);
    });
  }
});


module.exports = server;