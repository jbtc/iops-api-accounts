'use strict';

import Moment from 'moment';
import ShortId from 'shortid';
import {ObjectId} from 'promised-mongo';
import Boom from 'boom';
import _ from 'lodash';

export default {

  async applyDefaults(model = {}) {
    model._id = ShortId.generate();
    model.createdAt = Moment().utc().toDate();
    model.updatedAt = Moment().utc().toDate();
    model.isActive = true;
    return model;
  },

  async idMapping(model) {
    return await model;
  },

  async idMappingToArray(models) {
    return models;
  },

  async sanitize(model) {
    if (model._id) {
      delete model._id;
    }
    return await model;
  },

  toObjectId(id) {
    return new ObjectId(id.toString());
  }

};


