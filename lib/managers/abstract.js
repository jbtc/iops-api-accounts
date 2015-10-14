'use strict';

class AbstractManager {

  constructor(name) {
    this.table = this.r.table(name);
  }

  get r() {
    return require('../../config/r');
  }

  get all() {
    return this.table;
  }

  filterBy(predicate) {
    predicate = predicate || {};
    return this.table.filter(predicate);
  }

  byId(id) {
    return this.table.get(id);
  }

  removeById(id) {
    return this.byId(id).delete();
  }
}

module.exports = AbstractManager;
