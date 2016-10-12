'use strict';

import Boom from 'boom';
import Moment from 'moment';
import _ from 'lodash';
import Joi from '../joi';
import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.dashboards;

const initialize = async(site) => {
  site = Helpers.applyDefaults(site);
  site.widgets = site.widgets || [];
  
  return Promise.resolve(site);
};

const findUser = async(id) => {
  const user = await Db.users.findOne({ _id: id });
  if (!user) throw Boom.notFound(`User ${id} not found`);
  
  return user;
};

const updateUsersDashboard = async(user) => {
  return await Db.users.findAndModify({
    query: { _id: user._id },
    'new': false,
    update: { $set: { dashboards: user.dashboards } }
  });
};

export default {
  
  async find(criteria) {
    const dashboards = await COLLECTION.find(criteria);
    return await Helpers.idMappingToArray(dashboards);
  },
  
  async findOne(criteria) {
    const dashboard = await COLLECTION.findOne(criteria);
    if (dashboard) {
      return await Helpers.idMapping(dashboard);
    }
    throw Boom.notFound(`Dashboard not found`);
  },
  
  async findById(id) {
    const dashboard = await this.findOne({ _id: id });
    if (dashboard) {
      return await Helpers.idMapping(dashboard);
    }
    throw Boom.notFound(`Dashboard not found`);
  },
  
  async findByUserId(userId) {
    const user = await findUser(userId);
    console.log(user.dashboards);
    return await this.find({ _id: { $in: user.dashboards || [] } });
  },
  
  async create(model, userId) {
    model = await initialize(model);
    
    const user = await findUser(userId);
    user.dashboards = user.dashboards || [];
    
    await COLLECTION.insert(model);
    user.dashboards.push(model._id);
    delete model.userId;
    
    await updateUsersDashboard(user);
    
    return await this.findById(model._id);
  },
  
  async update(id, dashboard) {
    dashboard = await Helpers.sanitize(dashboard);
    return await COLLECTION.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: dashboard }
    });
  },
  
  async remove(id) {
    const users = await Db.collection('users').find({ dashboards: { $in: [id] } });
    
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      user.dashboards = _.without(user.dashboards, id);
      await Db.collection('users').save(user);
    }
    
    return await COLLECTION.remove({ _id: id });
  },
  
  async removeByUserId(id, userId) {
    const user = await findUser(userId);
    user.dashboards = _.without(user.dashboards, id);
    
    let result = await COLLECTION.remove({ _id: id });
    await updateUsersDashboard(user);
    
    return result;
  }
  
};
