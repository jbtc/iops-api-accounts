'use strict';


import Boom from 'boom';
import Services from '../lib/services';
import {BasicSite, Site} from '../lib/models/account';
import Joi from '../lib/joi';

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
    path: '/v1/accounts/{id}',

    config: {
      tags: ['api'],
      description: 'Account',

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
        payload: BasicSite
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
    path: '/v1/accounts/{id}',

    config: {
      tags: ['api'],
      description: 'Update an Account',

      validate: {
        params: {
          id: Joi.string().trim()
        },
        payload: BasicSite
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          const id = request.params.id;
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
    path: '/v1/accounts/{id}',

    config: {
      tags: ['api'],
      description: 'Delete an account',

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
