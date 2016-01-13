'use strict';

import Boom from 'boom';
import Services from '../lib/services';
import {BasicUser, User} from '../lib/models/user';
import Joi from '../lib/joi';

const clearTextPasswordSchema = Joi.object({ password: Joi.string().min(7) });

export default [

  {
    path: '/v1/users',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Users',

      handler: {
        async: async (request, reply) => {
          try {
            const results = Services.users.find({ isActive: true }, { passwordHash: 0 });
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/users/{id}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'User',

      validate: {
        params: {
          id: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.id;
          try {
            const user = await Services.users.findById(id, { passwordHash: 0 });
            if (!user) return reply(Boom.notFound(`User ${id} not found`));
            return reply(user);
          } catch (e) {
            return reply(e);
          }
        }
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
        payload: BasicUser.concat(clearTextPasswordSchema).without('_id', []).without('passwordHash', ['password'])
      },

      handler: {
        async: async (request, reply) => {
          try {
            let user = request.payload;
            user = await Services.users.create(user);
            return reply(user);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/users/{id}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: 'Update User',

      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: User.concat(clearTextPasswordSchema).without('passwordHash', ['password']).without('_id', []).optionalKeys('name.first', 'name.last', 'email')
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.id;
          try {
            let user = await Services.users.findById(id);
            if (!user) return reply(Boom.notFound(`User ${id} not found`));
            let results = await Services.users.update(id, request.payload);
            if (results.ok === 1 && results.value) {
              user = Services.users.findById(id, { passwordHash: 0 });
              return reply(user);
            }
            return reply(Boom.error(results.lastErrorObject))
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/users/{id}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Delete a User',

      validate: {
        params: {
          id: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.id;
          try {
            const user = await Services.users.findById(id);
            if (!user) return reply(Boom.notFound(`User ${id} not found`));
            await Services.users.remove(id);
            return reply();
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/accounts/{accountId}/users',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `User's by Account`,

      handler: {
        async: async (request, reply) => {
          try {
            const results = Services.users.find({ isActive: true }, { passwordHash: 0 });
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/login',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Generate a token to use for login',

      handler: {
        async: async (request, reply) => {
          try {
            const results = Services.users.find({ isActive: true }, { passwordHash: 0 });
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/forgot-password',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Forgot Password',

      handler: {
        async: async (request, reply) => {
          try {
            const results = Services.users.find({ isActive: true }, { passwordHash: 0 });
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  }

];
