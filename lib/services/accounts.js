'use strict';

import Boom from 'boom';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.accounts;

const initialize = async (account) => {
  account = await Helpers.applyDefaults(account);
  account.settings = account.settings || {};
  account.users = account.users || [];
  return await account;
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

  async create(account) {
    account = await initialize(account);

    await COLLECTION.insert(account);
    return await this.findById(account._id);
  },

  async update(id, account) {
    return await Db.account.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: account }
    });
  },

  async remove(id) {
    return await await COLLECTION.remove({ _id: id });
  }

};
