'use strict';

import Boom from 'boom';
import Moment from 'moment';
import _ from 'lodash';
import Joi from '../joi';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.dashboards;

const initialize = async (site) => {
  site = Helpers.applyDefaults(site);
  site.widgets = site.widgets || [];

  return site;
};

export default {

  async find() {
    const dashboards =  await COLLECTION.find();
    return await Helpers.idMappingToArray(dashboards);
  },

  async findOne(criteria) {
    const dashboard = await COLLECTION.findOne(criteria);
    if(dashboard) {
      return await Helpers.idMapping(dashboard);
    }
    throw Boom.notFound(`Dashboard not found`);
  },

  async findById(id) {
    const dashboard = await this.findOne({ _id: id });
    if(dashboard) {
      return await Helpers.idMapping(dashboard);
    }
    throw Boom.notFound(`Dashboard not found`);
  },

  async create(model) {
    model = await initialize(model);
    await COLLECTION.insert(model);
    return await this.findById(model._id);
  },

  async update(id, dashboard) {
    return await COLLECTION.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: dashboard }
    });
  },

  async remove(id) {
    return await await COLLECTION.remove({ _id: id });
  }

};
