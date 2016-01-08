'use strict';

import Boom from 'boom';
import JWT from 'jsonwebtoken';
import Moment from 'moment';
import Joi from 'joi';
import _ from 'lodash';
import Bcrypt from 'bcryptjs';
import Hat from 'hat';

const SALT_WORK_FACTOR = 10;
const EXPIRES_AT = Moment(1, 'years').unix();

import Db from '../db';
import Helpers from './helpers';

const initialize = async (model) => {
  model = await Helpers.applyDefaults(model);
  model.settings = model.settings || {};
  model.accounts = model.accounts || [];
  model.claims = model.claims || {};
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

const generateToken = async (user) => {
  user = await sanitize(user);
  let session = _.defaults(user, {
    iss: 'iops-accounts',
    iat: Moment().unix(),
    exp: EXPIRES_AT
  });

  return sign(session);
};


export default {

  async find(criteria, projection) {
    return await Db.users.find(criteria, projection);
  },

  async findOne(criteria, projection) {
    return await Db.users.findOne(criteria, projection);
  },

  async findById(id, projection) {
    return await this.findOne({ _id: id }, projection);
  },

  async create(user) {
    user = await initialize(user);

    await Db.users.insert(user);
    return await this.findById(user._id);
  },

  async update(id, user) {
    return await Db.users.update({ _id: id }, { $set: user });
  },

  async remove(id) {
    return await await Db.users.remove({ _id: id });
  },

  async exists(email) {
    const users = await Db.users.count({ email });
    return users > 0;
  },

  async authenticate(email, password) {
    const user = await this.findOne({ email });
    if (!user || !user.passwordHash) throw Boom.unauthorized('Wrong username/password');

    const isValidLogin = Bcrypt.compareSync(password, user.passwordHash);
    if (!isValidLogin) throw Boom.unauthorized('Wrong username/password');

    return await generateToken(user);
  }

};
