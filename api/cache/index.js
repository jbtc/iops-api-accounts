'use strict';

let Catbox = require('catbox');
let CatboxRedis = require('catbox-redis');

let plugin = (server, options, next) => {

  options = options || {};
  options.host = options.host || 'docker.dev';
  options.port = options.port || '6379';

  let client = new Catbox.Client(CatboxRedis, options);
  server.expose({ client });
  client.start((err) =>{
    if(err) return next(err);
    console.log(`Setting up the cache`);
    next();
  });

};

plugin.attributes = require('./package');

module.exports = plugin;
