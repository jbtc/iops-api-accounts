'use strict';

var Promise = require('bluebird');
var db = require('../../config').db;
var MongoJs = require('mongojs');

class AbstractManager {
  constructor(name, options) {
    options = options || {};
    this.collection = Promise.promisifyAll(db.collection(name));

    if (options.setup) {
      options.setup();
    }
  }

  find(predicate) {
    predicate = predicate || {};
    return this.collection.findAsync(predicate);
  }

  findById(id) {
    return this.collection.findOneAsync({ _id: this.toObjectId(id) });
  }

  create(entity) {
    return this.collection.saveAsync(entity);
  }

  update(id, entity) {
    return this.collection.updateAsync({ _id: this.toObjectId(id) }, entity);
  }

  remove(id) {
    return this.collection.removeAsync({ _id: this.toObjectId(id) }, true);
  }


  toObjectId(id) {
    return MongoJs.ObjectId(id);
  }
}

//function AbstractManager(name, options) {
//  options = options || {};
//
//  Object.defineProperties(this, {
//    collection: { enumerable: true, configurable: false, value: Promise.promisifyAll(db.collection(name)) }
//  });
//
//  if (options.setup) {
//    options.setup();
//  }
//}
//
//AbstractManager.prototype.toObjectId = function(id) {
//  return MongoJs.ObjectId(id);
//};

module.exports = AbstractManager;