'use strict';

import Joi from 'joi';
import Boom from 'boom';
import UsersService from '../lib/services/users';

//const User = {
//  id: Joi.string().description('Id'),
//  firstName: Joi.string().required().min(2).description('First Name'),
//  lastName: Joi.string().required().min(2).description('Last Name'),
//  email: Joi.string().required().email().lowercase().description('Email'),
//  token: Joi.string().default(Hat()).description('token'),
//  accounts: Joi.array().description('Accounts'),
//  claims: Joi.object().description('Claims'),
//  isActive: Joi.bool().description('Active'),
//  createdAt: Joi.date().description('Created At'),
//  updatedAt: Joi.date().description('Updated At')
//};

export default [

  {
    path: '/v1/users',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Users',

      //response: {
      //  schema: Joi.array().items(Account).meta({ className: 'Accounts' })
      //},

      handler: {
        async: async (request, reply) => {
          try {
            const results = UsersService.find({ isActive: true }, { passwordHash: 0 });
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

      //response: {
      //  schema: Joi.array().items(Account).meta({ className: 'Accounts' })
      //},

      validate: {
        params: {
          id: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.id;
          try {
            const user = await UsersService.findById(id);
            if (!user) return reply(Boom.notFound(`User ${id} not found`));
            return reply(user);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },


];
