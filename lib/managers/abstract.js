'use strict';

import _r from '../../config/r';

export default class {

  constructor(name) {
    this.table = this.r.table(name);
  }

  get r() {
    return _r;
  }

  get all() {
    return this.table;
  }

  filterBy(predicate = {}) {
    return this.table.filter(predicate);
  }

  byId(id) {
    return this.table.get(id);
  }

  removeById(id) {
    return this.byId(id).delete();
  }
}
