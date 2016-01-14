'use strict';

import Boom from 'boom';
import JWT from 'jsonwebtoken';
import Moment from 'moment';
import Joi from 'joi';
import _ from 'lodash';
import Bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;
const EXPIRES_AT = Moment(10, 'years').unix();

import Db from '../db';
import Helpers from './helpers';

const COLLECTION = Db.users;

const initialize = async (model) => {
  model = await Helpers.applyDefaults(model);
  model.settings = model.settings || {};
  model.claims = model.claims || {};
  model.dashboards = model.dashboards || {};
  return await model;
};

const hashPassword = (user) => {
  return new Promise((resolve, reject) => {
    Bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return reject(err);
      Bcrypt.hash(user.password, salt, (err, result) => {
        if (err) return reject(err);
        delete user.password;
        user.passwordHash = result;
        return resolve(user);
      });
    });
  });
};

const SECRET_KEY = process.env.SECRET_KEY || `6h@pX:/Se>Mlb$RwjeG'tY98[3u1[Fmm&35qn9E448i?!c342188g6E$6|:7.4h`;
const sign = (session) => {
  return JWT.sign(session, SECRET_KEY);
};

const generateSessionToken = async (user) => {
  let session = _.defaults(user, {
    iss: 'iops-accounts',
    iat: Moment().unix(),
    exp: EXPIRES_AT
  });

  return await sign(session);
};


export default {

  async find(criteria, projection) {
    return await COLLECTION.find(criteria, projection);
  },

  async findOne(criteria, projection) {
    return await COLLECTION.findOne(criteria, projection);
  },

  async findById(id, projection) {
    return await this.findOne({ _id: id }, projection);
  },

  async exists(email) {
    let results = await COLLECTION.find({ email }).count();
    return results > 0;
  },

  async create(user) {
    let exists = await this.exists(user.email);
    if (!exists) {
      user = await initialize(user);
      user = await hashPassword(user);

      await COLLECTION.insert(user);
      return await this.findById(user._id, { passwordHash: 0 });
    }
    throw Boom.conflict(`User ${user.email} already exists`);
  },

  async update(id, user) {
    return await COLLECTION.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: user }
    });


    //{ _id: id }, { $set: user }, { multi: false });
  },

  async remove(id) {
    return await await COLLECTION.remove({ _id: id });
  },

  async exists(email) {
    const users = await COLLECTION.count({ email });
    return users > 0;
  },

  async authenticate(email, password) {
    const user = await this.findOne({ email });
    if (!user || !user.passwordHash) throw Boom.unauthorized('Wrong username/password');

    const isValidLogin = Bcrypt.compareSync(password, user.passwordHash);
    if (!isValidLogin) throw Boom.unauthorized('Wrong username/password');

    return await generateSessionToken(user);
  }

};
