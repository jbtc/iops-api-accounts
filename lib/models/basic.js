'use strict';

export default class {

  constructor(properties = {}) {
    const keys = Object.keys(properties);

    for (let key of keys) {
      this[key] = properties[key];
    }
  }

}
