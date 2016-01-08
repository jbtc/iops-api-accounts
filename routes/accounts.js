'use strict';

import Joi from 'joi';
import Boom from 'boom';
import AccountsService from '../lib/services/accounts'

export default [

  {
    method: 'GET',
    path: '/v1/accounts',

    config: {
      tags: ['api']
    },

    handler: {
      async: async (request, reply) => {
        try {
          const accounts = await AccountsService.find();
          return reply(accounts);
        } catch (e) {
          return await reply(e);
        }
      }
    }

  },

  {
    method: 'GET',
    path: '/v1/accounts/{id}',

    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string().trim()
        }
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          const id = request.params.id;
          const accounts = await AccountsService.findById(id);
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
      validate: {
        payload: Joi.object({
          name: Joi.string().min(2).trim().description('Name'),
          settings: Joi.object()
        })
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          let account = await AccountsService.create(request.payload);
          return reply(account);
        } catch (e) {
          return await reply(e);
        }
      }
    }
  },

  {
    method: 'PUT',
    path: '/v1/accounts/{id}',

    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string().trim()
        },
        payload: Joi.object({
          name: Joi.string().min(2).trim().description('Name'),
          settings: Joi.object(),
          isActive: Joi.boolean()
        })
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          const id = request.params.id;
          let account = request.payload;
          const result = await AccountsService.update(id, account);

          if (result.ok === 1 && result.n === 0) {
            return reply(Boom.notFound(`Account ${id} not found`));
          }

          account = await AccountsService.findById(id);
          return reply(account);
        } catch (e) {
          return await reply(e);
        }
      }
    }
  },

  {
    method: 'DELETE',
    path: '/v1/accounts/{id}',

    config: {
      tags: ['api'],

      validate: {
        params: {
          id: Joi.string().trim()
        }
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          const id = request.params.id;
          const result = await AccountsService.remove(id);
          if (result.ok === 1 && result.n === 0) {
            return reply(Boom.notFound(`Account ${id} not found`));
          }
          return reply();
        } catch (e) {
          return await reply(e);
        }
      }
    }
  },
];
