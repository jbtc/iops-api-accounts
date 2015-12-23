'use strict';

import Promise from 'bluebird';
import JWT from 'jsonwebtoken';
import Moment from 'moment';
import Joi from 'joi';
import Boom from 'boom';
import _ from 'lodash';
import {r} from '../../config';
import Bcrypt from 'bcryptjs';
import Hat from 'hat';
import ModelHelpers from '../../lib/models';


const SALT_WORK_FACTOR = 10;
const EXPIRES_AT = Moment(1, 'months').unix();

const User = {
  id: Joi.string().description('Id'),
  firstName: Joi.string().required().min(2).description('First Name'),
  lastName: Joi.string().required().min(2).description('Last Name'),
  email: Joi.string().required().email().lowercase().description('Email'),
  token: Joi.string().default(Hat()).description('token'),
  accounts: Joi.array().description('Accounts'),
  claims: Joi.object().description('Claims'),
  isActive: Joi.bool().description('Active'),
  createdAt: Joi.date().description('Created At'),
  updatedAt: Joi.date().description('Updated At')
};

const UserFields = ['id', 'firstName', 'lastName', 'email', 'accounts', 'claims', 'isActive', 'createdAt', 'updatedAt'];


let hashPassword = (user) => {
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

let applyDefaults = (user) => {
  return new Promise((resolve) => {
    user = ModelHelpers.applyBasicDefaults(user);
    user.accounts = user.accounts || [];
    user.claims = user.claims || {};
    user.token = Hat();
    return resolve(user);
  });
};

let sanitize = (user) => {
  return new Promise(resolve => {
    user = _.omit(user, ['password', 'passwordHash', 'token']);
    return resolve(user);
  });
};

let userExists = (user) => {
  return r.table('users')
    .filter({ email: user.email })
    .isEmpty()
    .run()
    .then((result) => {
      return !result;
    });
};

let authenticate = (user, password) => {
  return new Promise((resolve, reject) => {
    if (!user.passwordHash) return reject(Boom.unauthorized('Wrong username or password'));
    return resolve(Bcrypt.compareSync(password, user.passwordHash));
  });
};

const SECRET_KEY = process.env.SECRET_KEY || `6h@pX:/Se>Mlb$RwjeG'tY98[3u1[Fmm&35qn9E448i?!c342188g6E$6|:7.4h`;
const sign = (session) => {
  return JWT.sign(session, SECRET_KEY);
};

const generateToken = async (user) => {
  user = await sanitize(user);
  let session = _.defaults(user, {
    iss: 'iops-api-accounts',
    iat: Moment().unix(),
    exp: EXPIRES_AT
  });

  return sign(session);
};


export default [

  {
    path: '/v1/users',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'All Users',

      response: {
        schema: Joi.array().items(User).meta({ className: 'User' })
      },

      validate: {
        query: {
          all: Joi.bool().description('Toggles showing all users'),
          accountId: Joi.string().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let query = r.table('users');

            let filters = { isActive: true };

            if (request.query.all) {
              delete filters.isActive;
            }

            query = query.filter(filters);

            let accountId = request.query.accountId;
            if (accountId) {
              query = query.filter((user) => {
                return user('accounts').contains(accountId)
              });
            }

            let result = yield query.withFields(UserFields)
              .orderBy(r.desc('lastName'))
              .run();

            request.log(['info'], result);
            return reply(result);

          } catch (e) {
            request.log(['error'], e);
            return reply(e);
          }
        })
      }
    }
  },

  {
    path: '/v1/users/{id}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'User by Id',

      validate: {
        params: {
          id: Joi.string().description('User Id')
        }
      },

      response: {
        schema: Joi.object().keys(User)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let user = yield r.table('users')
              .get(request.params.id)
              .run();

            if (!user) return reply(Boom.notFound('User not found'));

            user = yield sanitize(user);

            return reply(user);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },

  {
    path: '/v1/users',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Create User',

      validate: {
        payload: Joi.object().keys({
          firstName: Joi.string().required().min(2).description('First Name'),
          lastName: Joi.string().required().min(2).description('Last Name'),
          email: Joi.string().email().required().lowercase().description('Email'),
          password: Joi.string().required().min(7).description('Password'),
          accounts: Joi.array().items(Joi.string().required().description('Account Id')).description('Accounts')
        })
      },

      response: {
        schema: Joi.object().keys(User)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let user = yield applyDefaults(request.payload);

            let exists = yield userExists(user);
            if (exists) {
              return reply(Boom.conflict(`User already exists with email: ${user.email}`));
            }

            user = yield hashPassword(user);

            let result = yield r.table('users')
              .insert(user, { returnChanges: true })
              .run();

            user = _.first(result.changes).new_val;

            user = yield sanitize(user);

            return reply(user).code(201);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },

  {
    path: '/v1/users/{id}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: 'Updates a user',

      response: {
        schema: Joi.object().keys(User)
      },

      validate: {
        payload: Joi.object().keys({
          firstName: Joi.string().min(2).description('First Name'),
          lastName: Joi.string().min(2).description('Last Name'),
          email: Joi.string().email().lowercase().description('Email'),
          password: Joi.string().min(7).description('Password'),
          token: Joi.string().description('token'),
          accounts: Joi.array().description('Accounts'),
          claims: Joi.object().description('Claims'),
          isActive: Joi.bool().description('Active')
        })
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let userId = request.params.id;
            let user = request.payload;
            if (user.password) {
              user = yield hashPassword(user);
            }
            user.updatedAt = Moment().utc().toDate();

            if (user.email) {
              let exists = yield userExists(user);
              if (exists) {
                let existingUserResults = yield r.table('users')
                  .filter({ email: user.email })
                  .run();
                if (_.first(existingUserResults).id !== userId) {
                  return reply(Boom.conflict(`User already exists with email ${user.email}`));
                }
              }
            }

            let result = yield r.table('users')
              .get(userId)
              .update(user, { returnChanges: true })
              .run();

            let changedUser = _.first(result.changes).new_val;
            changedUser = yield sanitize(changedUser);

            request.log(['info'], changedUser);

            return reply(changedUser);
          } catch (e) {
            request.log(['error'], e);
            return reply(e);
          }
        })
      }
    }
  },

  {
    path: '/v1/users/{id}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Deletes a user',
      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let id = request.params.id;
            let result = yield r.table('users')
              .get(id)
              .delete()
              .run();

            if (result.deleted > 0) {
              request.log(['info'], `User ${id} deleted`);
              return reply({});
            } else {
              request.log(['error'], `User not found ${id}`);
              return reply(Boom.notFound('User not found'));
            }
          } catch (e) {
            request.log(['error'], e);
            return reply(e);
          }
        })
      }
    }
  },

  {
    path: '/v1/login',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Login',

      validate: {
        payload: Joi.object().keys({
          email: Joi.string().email().required().lowercase().description('Email'),
          password: Joi.string().required().min(7).description('Password')
        })
      },

      response: {
        schema: Joi.object().keys({
          token: Joi.string()
        })
      },

      handler: {
        async: async (request, reply) => {
          try {

            let email = request.payload.email;
            let password = request.payload.password;
            let results = await r.table('users')
              .getAll(email, { index: 'email' })
              .run();

            let user = _.first(results);
            if (!user) {
              return reply(Boom.notFound(`User not found`))
            }
            let authenticated = await authenticate(user, password);
            if (!authenticated) {
              return reply(Boom.unauthorized('Wrong username/password', request.payload));
            }

            const token = await generateToken(user);

            return reply({ token });
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  }
];
