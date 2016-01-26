'use strict';

import Boom from 'boom';
import Moment from 'moment';
import _ from 'lodash';
import Joi from '../joi';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.sites;

const initialize = async (site) => {
  return await Helpers.applyDefaults(site);
};

export default {

  async find() {
    const sites = await COLLECTION.find();
    return await Helpers.idMappingToArray(sites);
  },

  async findOne(criteria) {
    const site = await COLLECTION.findOne(criteria);
    if (site) {
      return await Helpers.idMapping(site);
    }
    throw Boom.notFound(`Site not found`);
  },

  async findById(id) {
    const site = await this.findOne({ _id: id });
    if (site) {
      return await Helpers.idMapping(site);
    }
    throw Boom.notFound(`Site not found`);
  },

  async create(model) {
    model = await initialize(model);
    await COLLECTION.insert(model);
    return await this.findById(model._id);
  },

  async update(id, site) {
    return await COLLECTION.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: site }
    });
  },

  async remove(accountId, id) {
    const site = this.findById(id);
    if (!site || site.accountId === accountId) {
      throw new Boom.notFound(`Site ${id} not found`);
    }
    return await await COLLECTION.remove({ _id: id });
  }

};
