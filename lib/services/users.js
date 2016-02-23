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
  model.claims = model.claims || [];
  model.dashboards = model.dashboards || [];
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

const getUserRoles = async (user) => {
  user.roles = user.roles || [];
  return await Db.collection('roles').find({ _id: { $in: user.roles } });
};

const updateUsersClaims = async (user) => {

  let roles = await getUserRoles(user);

  let usersClaims = [];
  for (let r of roles) {
    usersClaims.push(r.claims);
  }
  usersClaims = _.unique(usersClaims);

  const claims = await Db.collection('claims').find({ _id: { $in: usersClaims } });
  for (let c of claims) {
    user.claims[c._id] = c;
  }

  return user;
};

export default {

  async find(criteria, projection) {
    const users = await COLLECTION.find(criteria, projection);
    return await Helpers.idMappingToArray(users);
  },

  async findOne(criteria, projection) {
    const user = await COLLECTION.findOne(criteria, projection);
    if (user) {
      return await Helpers.idMapping(user);
    }
    throw Boom.notFound(`User not found`);
  },

  async findById(id, projection) {
    const user = await this.findOne({ _id: id }, projection);
    if (user) {
      return await Helpers.idMapping(user);
    }
    throw Boom.notFound(`User not found`);
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
      user = await updateUsersClaims(user);


      await COLLECTION.insert(user);
      return await this.findById(user._id, { passwordHash: 0 });
    }
    throw Boom.conflict(`User ${user.email} already exists`);
  },

  async update(id, user) {
    user = await Helpers.sanitize(user);
    user = await updateUsersClaims(user);

    if (user.password) {
      user = await hashPassword(user);
    }

    return await COLLECTION.findAndModify({
      query: { _id: id },
      'new': false,
      update: { $set: user }
    });
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
