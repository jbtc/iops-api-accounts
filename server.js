'use strict';

import Hapi from 'hapi';
import Relish from 'relish';

import Catbox from 'catbox';
import CatboxRedis from 'catbox-redis';

import Config from './config';
//import AccountsPlugin from './accounts';


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

const startCache = async (options = {}) => {

  const client = new Catbox.Client(CatboxRedis, options);
  return await new Promise((resolve, reject) => {
    client.start((err) => {
      if (err) return reject(err);
      return resolve();
    });
  });

};


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
  {
    register: require('hapi-router'),
    options: {
      routes: 'routes/**/*.js'
    }
  },
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

  server.start(function () {
    console.log("Server started", server.info.uri);
  });
});


export default server;
