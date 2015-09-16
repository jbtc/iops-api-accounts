'use strict';

let Hapi = require('hapi');
let config = require('./config');
let router = require('./lib/routes');

var server = new Hapi.Server({
  connections: {
    routes: {
      cors: { origin: ['*'], matchOrigin: false, additionalHeaders: ['Access-Control-Allow-Origin'] },
    },
  },
});
server.connection({
  port: config.get('PORT'),
  router: { isCaseSensitive: false, stripTrailingSlash: true },
  labels: ['api'],
});

server.route(router);

let plugins = [
  require('inert'),
  require('vision'),
  require('hapi-routes-status'),
  require('blipp'),
  require('tv'),
  require('hapi-auth-jwt2'),

  {
    register: require('good'),
    options: {
      opsInterval: 5000,
      reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*', error: '*' },
      }],
    },
  },

  {
    register: require('hapi-swaggered'),
    options: {
      tags: {},
      info: {
        title: 'iOPS Accounts Api',
        description: 'Account management for iOPS',
        version: '1.0.0',
      },
    },
  },

  {
    register: require('hapi-swaggered-ui'),
    options: {
      title: 'iOPS Accounts Api',
      path: '/docs',
    },
  },

];

server.register(plugins, { select: 'api' }, function(err) {
  if (err) {
    throw err;
  }

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

  config.db.setup()
    .then(function() {
      if (!module.parent) {
        server.start(function() {
          console.log('Server started', server.info.uri);
        });
      }
    })
    .catch(function(err) {
      console.error(err);
    });
});


module.exports = server;