'use strict';

var Promise = require('promise');
var db = require('../../config').db;

function AbstractManager(name, options) {
  options = options || {};

  Object.defineProperties(this, {
    collection: { enumerable: true, configurable: false, value: Promise.promisifyAll(db.collection(name)) },
    hooks: { enumerable: false, configurable: false, value: [] }
  });

  if (options.setup) {
    options.setup();
  }
}

module.exports = AbstractManager;