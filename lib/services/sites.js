'use strict';

import Boom from 'boom';
import Moment from 'moment';
import _ from 'lodash';
import Joi from '../joi';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.sites;

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

  async create(account) {
    await COLLECTION.insert(account);
    return await this.findById(account._id);
  },

  async update(id, account) {
    return await COLLECTION.update({ _id: id }, { $set: account });
  },

  async remove(id) {
    return await await COLLECTION.remove({ _id: id });
  }

};
