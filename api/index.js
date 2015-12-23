'use strict';

import Hapi from 'hapi';

const server = new Hapi.Server({
  connections: {
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*']
      }
    }
  }
});


server.connection({ port: process.env.PORT || 3000 });

server.route({
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply.redirect('/docs');
  }
});

server.register([
  require('blipp'),
  require('inert'),
  require('vision'),
  require('tv'),
  require('hapi-async-handler'),
  require('./accounts'),
  require('./users'),
  require('./claims'),
  require('./roles'),
  //{
  //  register: require('./cache'),
  //  options: {
  //    host: process.env.ACCOUNTS_REDIS_HOST || 'localhost',
  //    port: process.env.ACCOUNTS_REDIS_PORT || '6379'
  //  }
  //},
  {
    register: require('good'),
    options: {
      requestHeaders: true,
      reporters: [
        {
          reporter: 'good-console',
          events: { response: '*', log: '*', error: '*' }
        }
      ]
    }
  },
  {
    register: require('hapi-swaggered'),
    options: {
      tags: {}, info: {
        title: 'iOps Accounts API',
        description: 'Account management',
        version: require('../package').version
      }
    }
  },
  {
    register: require('hapi-swaggered-ui'),
    options: {
      title: 'iOps Accounts API',
      path: '/docs'
    }
  }
], err => {
  if (err) throw err;

  server.start(function () {
    console.log("Server started", server.info.uri);
  });

});


export default server;
