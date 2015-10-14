'use strict';

let r = require('../config/r');
let _ = require('lodash');

let register = (server, options, next) => {
  options = options || {};

  let config = server.plugins.configuration.byKey('rethinkdb');

  r.verify(config.db, config.tables).then(() => {
    next();
  }).catch((e) => {
    console.error(e);
    throw e;
  });

};

register.attributes = {
  name: 'rethinkdb',
  dependencies: 'configuration'
};

module.exports = register;
