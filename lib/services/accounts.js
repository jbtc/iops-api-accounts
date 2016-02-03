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
    const accounts = await COLLECTION.find();
    return await Helpers.idMappingToArray(accounts);
  },

  async findOne(criteria) {
    const account = await COLLECTION.findOne(criteria);
    if (account) {
      return await Helpers.idMapping(account);
    }

    throw new Boom.notFound(`Account not found`);
  },

  async findById(id) {
    const account = await this.findOne({_id: id});
    if (account) {
      return await Helpers.idMapping(account);
    }

    throw new Boom.notFound(`Account not found`);
  },

  async create(account) {
    account = await initialize(account);

    await COLLECTION.insert(account);
    return await this.findById(account._id);
  },

  async update(id, account) {
    account = await Helpers.sanitize(account);
    return await Db.accounts.findAndModify({
      query: {_id: id},
      'new': false,
      update: {$set: account}
    });
  },

  async remove(id) {
    return await await COLLECTION.remove({_id: id});
  }

};
