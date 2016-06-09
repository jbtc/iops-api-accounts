'use strict';

import Hapi from 'hapi';
import Relish from 'relish';

import Config from './config';

const server = new Hapi.Server({
  connections: {
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*']
      },
      validate: {
        failAction: Relish.failAction
      }
    }
  }
});

server.connection({ port: process.env.PORT || 4000 });

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
  {
    register: require('hapi-router'),
    options: {
      routes: 'routes/**/*.js'
    }
  },
  {
    register: require('good'),
    options: {
      includes: { request: ['headers', 'payload'], response: ['payload']},
      ops: {
        interval: 5000
      },
      reporters: {
        console: [{ module: 'good-console' }, 'stdout']
      }
    }
  },
  {
    register: require('hapi-swaggered'),
    options: {
      tags: {}, info: {
        title: 'iOps Accounts API',
        description: 'Account management',
        version: require('./package').version
      }
    }
  },
  {
    register: require('hapi-swaggered-ui'),
    options: {
      title: 'iOps Accounts API',
      path: '/docs',
      swaggerOptions: {
        docExpansion: 'list'
      }
    }
  }
], err => {
  if (err) throw err;

  server.start(() => {
    console.log("Server started", server.info.uri);
  });
});


export default server;
