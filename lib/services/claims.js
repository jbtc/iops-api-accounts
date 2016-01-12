'use strict';

import Boom from 'boom';
import Moment from 'moment';
import _ from 'lodash';
import Joi from '../joi';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.claims;

const initialize = (model) => {
  model = Helpers.applyDefaults(model);
  return model;
};

export default {

  async find(criteria, projection) {
    return await COLLECTION.find(criteria, projection);
  },

  async findOne(criteria, projection) {
    return await COLLECTION.findOne(criteria, projection);
  },

  async findById(id) {
    return await this.findOne({ _id: id });
  },

  async create(model) {
    model = initialize(model);
    await COLLECTION.insert(model);
    return await this.findById(model._id);
  },

  async update(id, account) {
    return await COLLECTION.update({ _id: id }, { $set: account });
  },

  async remove(id) {
    return await await COLLECTION.remove({ _id: id });
  }

};
