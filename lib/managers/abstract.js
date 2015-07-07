'use strict';

var db = require('../../config').db;

function AbstractManager(name, options) {
  options = options || {};

  Object.defineProperties(this, {
    collection: { enumerable: true, configurable: false, value: db.collection(name) },
    hooks: { enumerable: false, configurable: false, value: [] }
  });

  if (options.setup) {
    options.setup();
  }
}

module.exports = AbstractManager;