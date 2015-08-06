'use strict';

var Promise = require('bluebird')
  , db = require('../../config').db
  , MongoJs = require('mongojs');

class AbstractManager {
  /**
   * Abstract Manager
   * @public
   * @param {string} name
   * @param {object} options
   */
  constructor(name) {
    this.collection = Promise.promisifyAll(db.collection(name));
  }

  find(predicate) {
    predicate = predicate || {};
    return this.collection.findAsync(predicate);
  }

  findById(id) {
    return this.collection.findOneAsync({ _id: this.parse(id) });
  }

  create(entity) {
    return this.collection.saveAsync(entity);
  }

  update(id, entity) {
    return this.collection.updateAsync({ _id: this.parse(id) }, entity);
  }

  remove(id) {
    return this.collection.removeAsync({ _id: this.parse(id) }, true);
  }


  parse(id) {
    return MongoJs.ObjectId(id);
  }
}

module.exports = AbstractManager;