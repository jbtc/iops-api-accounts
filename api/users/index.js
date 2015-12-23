'use strict';

import routes from './routes';

let plugin = (server, options, next) => {
  server.route(routes);
  return next();
};

plugin.attributes = { pkg: require('./package') };

module.exports = plugin;
