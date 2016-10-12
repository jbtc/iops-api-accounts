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
  return Promise.resolve(model);
};

export default {

  async find(criteria, projection) {
    const claims = await COLLECTION.find(criteria, projection);
    return await Helpers.idMappingToArray(claims);
  },

  async findOne(criteria, projection) {
    const claim = await COLLECTION.findOne(criteria, projection);
    if (claim) {
      return await Helpers.idMapping(claim)
    }
    throw Boom.notFound(`Claim not found`);
  },

  async findById(id) {
    const claim = await this.findOne({ _id: id });
    if (claim) {
      return await Helpers.idMapping(claim)
    }
    throw Boom.notFound(`Claim not found`);
  },

  async create(model) {
    model = await initialize(model);
    let result = await COLLECTION.insert(model);
    return await this.findById(result._id);
  },

  async update(id, claim) {
    claim = await Helpers.sanitize(claim);
    return await COLLECTION.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: claim }
    });
  },

  async remove(id) {
    return await await COLLECTION.remove({ _id: id });
  }

};
