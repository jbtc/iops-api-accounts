'use strict';

var Promise = require('bluebird');
var db = require('../../config').db;
var MongoJs = require('mongojs');

function AbstractManager(name, options) {
  options = options || {};

  Object.defineProperties(this, {
    collection: { enumerable: true, configurable: false, value: Promise.promisifyAll(db.collection(name)) }
  });

  if (options.setup) {
    options.setup();
  }
}

AbstractManager.prototype.toObjectId = function(id) {
  return MongoJs.ObjectId(id);
};

module.exports = AbstractManager;