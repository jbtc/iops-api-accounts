'use strict';

import Boom from 'boom';
import Moment from 'moment';
import _ from 'lodash';
import Joi from '../joi';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.dashboards;

const initialize = (site) => {
  site = Helpers.applyDefaults(site);
  site.widgets = site.widgets || [];

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
