'use strict';

let Promise = require('bluebird');
let Moment = require('moment');
let Joi = require('joi');
let Boom = require('boom');
let _ = require('lodash');
let r = require('../../config').r;

let Account = {
  id: Joi.string().description('Id'),
  name: Joi.string().required().min(2).description('Name'),
  createdAt: Joi.date().description('Created At'),
  updatedAt: Joi.date().description('Updated At'),
  isActive: Joi.bool().description('Active')
};


module.exports = [
  {
    path: '/v1/accounts',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'All accounts',

      response: {
        schema: Joi.array().items(Account).meta({ className: 'Accounts' })
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield r.table('accounts')
                                .filter({ isActive: true })
                                .orderBy(r.desc('name'))
                                .run();

            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/accounts',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Creates a new account',

      validate: {
        payload: Joi.object().keys({
          name: Joi.string().required().min(2).description('Name')
        })
      },

      response: {
        schema: Joi.object(Account)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {

            let account = request.payload;
            account.isActive = true;
            account.createdAt = Moment().utc().toDate();
            account.updatedAt = Moment().utc().toDate();

            let result = yield r.table('accounts')
                                .insert(request.payload)
                                .run();


            let newId = _.first(result.generated_keys);


            let newAccount = yield r.table('accounts')
                                    .get(newId)
                                    .run();

            return reply(newAccount).code(201);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/accounts/{id}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Retrieves an account by Id',

      response: {
        schema: Joi.object().keys(Account)
      },

      validate: {
        params: {
          id: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield r.table('accounts')
                                .get(request.params.id)
                                .run();
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) {
            return reply(Boom.internal('InternalError', e, 500));
          }
        })
      }
    }
  },
  {
    path: '/v1/accounts/{id}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: 'Updates an account',
      validate: {

        params: {
          id: Joi.string().required().description('Account Id')
        },

        payload: Joi.object().keys({
          name: Joi.string().required().min(2).description('Name'),
          createdAt: Joi.date().description('Created At'),
          updatedAt: Joi.date().description('Updated At'),
          isActive: Joi.bool().description('Active')
        })
      },

      response: {
        schema: Joi.object().keys(Account)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let id = request.params.id;
            let result = yield r.table('accounts')
                                .get(id)
                                .update(request.payload)
                                .run();

            if (result.replaced > 0 || result.unchanged > 0) {
              let account = yield r.table('accounts').get(id).run();
              return reply(account);
            }

          } catch (e) { return reply(e); }
        })
      }
    }
  },
  {
    path: '/v1/accounts/{id}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Removes an account',
      validate: {
        params: {
          id: Joi.string().required().description('Account Id')
        }
      },
      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield r.table('accounts')
                                .get(request.params.id)
                                .delete()
                                .run();
            if (result.deleted == 1) {
              return reply();
            } else {
              return reply(Boom.notFound(`Account with id ${request.params.id} not found`));
            }
          }
          catch (e) { return reply(e);}
        })
      }
    }
  }
];
