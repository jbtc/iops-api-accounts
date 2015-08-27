'use strict';

let Promise = require('bluebird');
let db = require('../../config').db;
let MongoJs = require('mongojs');
let id = require('shortid');
id.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

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
    return this.findOne({ _id: id });
  }

  create(entity) {
    entity._id = id.generate();
    return this.collection.saveAsync(entity);
  }

  update(entity) {
    let id = entity.id;
    delete entity.id;
    return this.collection.findAndModifyAsync({
      query: { _id: id },
      update: { $set: entity }
    });
  }

  remove(id) {
    return this.collection.removeAsync({ _id: id }, true);
  }


  parse(id) {
    return MongoJs.ObjectId(id);
  }
}

module.exports = AbstractManager;