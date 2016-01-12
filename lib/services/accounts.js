'use strict';

import Boom from 'boom';
import Db from '../db';
import Helpers from './helpers';

const initialize = async (account) => {
  account = await Helpers.applyDefaults(account);
  account.settings = account.settings || {};
  account.users = account.users || [];
  return await account;
};

export default {

  async find() {
    return await Db.accounts.find();
  },

  async findOne(criteria) {
    return await Db.accounts.findOne(criteria);
  },

  async findById(id) {
    return await this.findOne({ _id: id });
  },

  async create(account) {
    account = await initialize(account);

    await Db.accounts.insert(account);
    return await this.findById(account._id);
  },

  async update(id, account) {
    return await Db.accounts.update({ _id: id }, { $set: account });
  },

  async remove(id) {
    return await await Db.accounts.remove({ _id: id });
  }

};
