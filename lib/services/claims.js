'use strict';

import Boom from 'boom';
import Moment from 'moment';
import _ from 'lodash';
import Joi from '../joi';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.claims;

const initialize = async (model) => {
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
    model = await initialize(model);
    let result = await COLLECTION.insert(model);
    return await this.findById(result._id);
  },

  async update(id, account) {
    return await COLLECTION.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: account }
    });
  },

  async remove(id) {
    return await await COLLECTION.remove({ _id: id });
  }

};
