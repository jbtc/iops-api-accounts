'use strict';

let Promise = require('bluebird');
let db = require('../../config').db;
let MongoJs = require('mongojs');

class AbstractManager {
  /**
   * Abstract Manager
   * @public
   * @param {string} name
   */
  constructor(name) {
    this._db = db;
    this.collection = Promise.promisifyAll(this._db.collection(name));
  }

  find(predicate) {
    predicate = predicate || {};
    return this.collection.findAsync(predicate);
  }

  findOne(predicate) {
    return this.collection.findOneAsync(predicate);
  }

  findById(id) {
    return this.findOne({ _id: this.parse(id) });
  }

  create(entity) {
    return this.collection.saveAsync(entity);
  }

  update(entity) {
    console.log(entity);
    return this.collection.findAndModifyAsync({
      query: { _id: this.parse(entity._id) },
      update: { $set: entity }
    });
  }

  remove(id) {
    return this.collection.removeAsync({ _id: this.parse(id) }, true);
  }


  parse(id) {
    return MongoJs.ObjectId(id);
  }
}

module.exports = AbstractManager;