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
    const roles = await COLLECTION.find();
    return await Helpers.idMappingToArray(roles);
  },

  async findOne(criteria) {
    const role = await COLLECTION.findOne(criteria);
    if (role) {
      return await Helpers.idMapping(role);
    }
    throw Boom.notFound(`Role not found`);
  },

  async findById(id) {
    const role = await this.findOne({ _id: id });
    if (role) {
      return await Helpers.idMapping(role);
    }
    throw Boom.notFound(`Role not found`);
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
