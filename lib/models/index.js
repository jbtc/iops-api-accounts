'use strict';

let Moment = require('moment');

let helpers = {

  setCreatedAt: (model) => {
    model.createdAt = Moment().utc().toDate();
    return model;
  },

  setUpdatedAt: (model) => {
    model.updatedAt = Moment().utc().toDate();
    return model;
  },

  setActive: (model) => {
    model.isActive = true;
    return model;
  },

  applyBasicDefaults: (model) => {
    model = helpers.setCreatedAt(model);
    model = helpers.setUpdatedAt(model);
    model = helpers.setActive(model);
    return model;
  }
};

module.exports = helpers;
