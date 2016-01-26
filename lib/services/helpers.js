'use strict';

import Moment from 'moment';
import ShortId from 'shortid';
import {ObjectId} from 'promised-mongo';
import Boom from 'boom';
import _ from 'lodash';

export default {

  async applyDefaults(model = {}) {
    model._id = ShortId.generate();
    model.id = model._id;
    model.createdAt = Moment().utc().toDate();
    model.updatedAt = Moment().utc().toDate();
    model.isActive = true;
    return model;
  },

  async idMapping(model) {
    if (model && model._id) {
      model.id = model._id;
      return model;
    }
  },

  async idMappingToArray(models) {
    if (_.some(models)) {
      return await _.map(models, model => {
        if (model && !model.id) {
          model.id = model._id;
        }
        return model;
      });
    }
    return models;
  }

};


