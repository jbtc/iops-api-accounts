'use strict';

let _ = require('lodash');

module.exports = {
  value: (result) => {
    return _.first(result.changes).new_val;
  }
};
