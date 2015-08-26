'use strict';

let Joi = require('joi');

module.exports = [
  {
    path: '/v1/registrations',
    method: 'POST',
    config: {
      validate: {
        payload: {
          account: Joi.object().keys({
            name: Joi.string().min(2).max(128)
          }),
          users: Joi.array().min(1).items(Joi.object().keys({
            firstName: Joi.string().min(2).max(128).required().description('First name'),
            lastName: Joi.string().min(2).max(128).required().description('Last Name'),
            email: Joi.string().email().lowercase().trim().required().description('Email address'),
            password: Joi.string().trim().required(),
            isAdmin: Joi.boolean().default(false, 'Account administrator')
          }))
        }
      },
      handler: function(request, reply) {
        reply({});
      }
    }
  }
];