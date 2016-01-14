'use strict';

import Boom from 'boom';
import Moment from 'moment';
import _ from 'lodash';
import Joi from '../joi';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.roles;

const initialize = async (site) => {
  site = Helpers.applyDefaults(site);
  site.claims = site.claims || [];

  return site;
};

export default {

  async find() {
    return await COLLECTION.find();
  },

  async findOne(criteria) {
    return await COLLECTION.findOne(criteria);
  },

  async findById(id) {
    return await this.findOne({ _id: id });
  },

  async create(model) {
    model = await initialize(model);
    await COLLECTION.insert(model);
    return await this.findById(model._id);
  },

  async update(id, role) {
    return await COLLECTION.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: role }
    });
  },

  async remove(id) {
    return await await COLLECTION.remove({ _id: id });
  }

};