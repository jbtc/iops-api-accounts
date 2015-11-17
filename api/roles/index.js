'use strict';

let plugin = (server, options, next) => {
  server.route(require('./routes'));
  next();
};

plugin.attributes = require('./package');

module.exports = plugin;
