'use strict';

let Boom = require('boom');
let _ = require('lodash');
let Joi = require('joi');
let Promise = require('bluebird');
let async = Promise.coroutine;
let AccountsManager = require('../managers/accounts');
let accountsManager = new AccountsManager();
let AbstractModel = require('../models/abstract');
let Account = require('../models/account');
let Schemas = require('../schemas');

module.exports = [

  {
    method: 'GET',
    path: '/v1/accounts',
    config: {
      tags: ['api'],
      description: 'Retrieves all the active accounts',
      response: {
        schema: Joi.array().items(Schemas.Accounts.ACCOUNT)
      }
    },

    handler: async(function* (request, reply) {
      var accounts = yield accountsManager.find({ isActive: true });
      var dtos = AbstractModel.toDtoCollection(accounts, Account);
      return reply(dtos);
    }),
  },

  {
    method: 'POST',
    path: '/v1/accounts',
    config: {
      tags: ['api'],
      description: 'Create a new account',

      validate: {
        payload: Schemas.Accounts.CREATE,
      },

      response: {
        schema: Schemas.Accounts.ACCOUNT
      },
    },

    handler: function(request, reply) {
      var account = request.payload;
      accountsManager.create(account)
        .then(function(account) {
          let dto = new Account(account).toDto();
          return reply(dto);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    },
  },

  {
    method: 'GET',
    path: '/v1/accounts/{id}',
    config: {
      tags: ['api'],
      description: 'Retrieves an account by it\'s id',
      response: {
        schema: Joi.array().items(Schemas.Accounts.ACCOUNT)
      },
      validate: {
        params: {
          id: Joi.string().alphanum().trim().description('Account Id')
        }
      }
    },

    handler: function(request, reply) {
      var id = request.params.id;
      accountsManager.findById(id)
        .then(function(account) {
          if (!account) {
            return reply(Boom.notFound('Account not found', account));
          }
          else {
            return reply(new Account(account).toDto());
          }
        });
    },
  },

  {
    method: 'PUT',
    path: '/v1/accounts/{id}',
    config: {
      tags: ['api'],
      description: 'Updates an account',
      response: { schema: Schemas.Accounts.FULL },

      validate: {
        params: {
          id: Joi.string().alphanum().required().description('Account Id'),
        },
        payload: Schemas.Accounts.UPDATE

      },


    },

    handler: function(request, reply) {
      var id = request.params.id;
      var account = request.payload;
      account._id = id;
      accountsManager.update(account)
        .then(function(account) {
          if (!account) {
            return reply(Boom.notFound('Account not found', account));
          }
          else {
            return accountsManager.findById(id)
              .then(function(account) {
                var dto = _.defaults(_.pick(account, ['name', 'active']), { id: account._id.toString() });
                return reply(dto);
              });
          }
        });
    },

  },

  {
    method: 'PATCH',
    path: '/v1/accounts/{id}',
    config: {
      plugins: {},
      handler: function(request, reply) {
        var id = request.params.id;
        var account = request.payload;
        accountsManager.patch(id, account)
          .then(function(account) {
            if (!account) {
              return reply(Boom.notFound('Account not found', account));
            }
            else {
              return accountsManager.findById(id)
                .then(function(account) {
                  var dto = _.defaults(_.pick(account, ['name', 'active']), { id: account._id.toString() });
                  return reply(dto);
                });
            }
          });
      },
    },

  },

  {
    method: 'DELETE',
    path: '/v1/accounts/{id}',
    config: {
      handler: function(request, reply) {
        var id = request.params.id;
        accountsManager.remove(id)
          .then(function(result) {
            if (result.ok) {
              return reply();
            }
            else {
              return reply(Boom.notFound('Account not found'));
            }

          });
      },
    },

  }

];
