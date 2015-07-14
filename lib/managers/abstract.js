'use strict';

var Promise = require('bluebird');
var db = require('../../config').db;

function AbstractManager(name, options) {
  options = options || {};

  Object.defineProperties(this, {
    collection: { enumerable: true, configurable: false, value: Promise.promisifyAll(db.collection(name)) }
  });

  if (options.setup) {
    options.setup();
  }
}

module.exports = AbstractManager;