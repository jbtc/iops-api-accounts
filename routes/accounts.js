'use strict';


import Boom from 'boom';
import Services from '../lib/services';
import Joi from '../lib/joi';
import * as Models from '../lib/models';
import _ from 'lodash';

export default [

  {
    method: 'GET',
    path: '/v1/accounts',

    config: {
      tags: ['api'],
      description: 'Accounts'
    },

    handler: {
      async: async (request, reply) => {
        try {
          const accounts = await Services.accounts.find();
          return reply(accounts);
        } catch (e) {
          return await reply(e);
        }
      }
    }
  },

  {
    method: 'GET',
    path: '/v1/accounts/{accountId}',

    config: {
      tags: ['api'],
      description: 'Account',

      validate: {
        params: {
          accountId: Joi.string().trim()
        }
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          const id = request.params.accountId;
          const accounts = await Services.accounts.findById(id);
          return reply(accounts);
        } catch (e) {
          return await reply(e);
        }
      }
    }
  },

  {
    method: 'POST',
    path: '/v1/accounts',

    config: {
      tags: ['api'],
      description: 'Create Account',

      validate: {
        payload: Joi.object(_.omit(Models.Account, 'isActive'))
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          let account = await Services.accounts.create(request.payload);
          return reply(account);
        } catch (e) {
          return await reply(e);
        }
      }
    }
  },

  {
    method: 'PUT',
    path: '/v1/accounts/{accountId}',

    config: {
      tags: ['api'],
      description: 'Update an Account',

      validate: {
        params: {
          accountId: Joi.string().required()
        },
        payload: Models.Account
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          const id = request.params.accountId;
          let account = request.payload;
          const result = await Services.accounts.update(id, account);

          if (result.ok === 1 && result.n === 0) {
            return reply(Boom.notFound(`Account ${id} not found`));
          }

          account = await Services.accounts.findById(id);
          return reply(account);
        } catch (e) {
          return await reply(e);
        }
      }
    }
  },

  {
    method: 'DELETE',
    path: '/v1/accounts/{accountId}',

    config: {
      tags: ['api'],
      description: 'Delete an account',

      validate: {
        params: {
          accountId: Joi.string().trim()
        }
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          const id = request.params.accountId;
          const result = await Services.accounts.remove(id);
          if (result.ok === 1 && result.n === 0) {
            return reply(Boom.notFound(`Account ${id} not found`));
          }
          return reply();
        } catch (e) {
          return await reply(e);
        }
      }
    }
  }

];
