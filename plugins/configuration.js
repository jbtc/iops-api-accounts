'use strict';

let configurator = require('../config/configurator');


let register = (server, options, next) => {
  options = options || {};

  server.expose({
    byKey: (key) => {
      return configurator.get(key);
    }
  });

  next();
};

register.attributes = {
  name: 'configuration'
};

module.exports = register;
