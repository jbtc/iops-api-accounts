'use strict';

let UsersManager = require('../managers/users');
let usersManager = new UsersManager();
let Boom = require('boom');
let _ = require('lodash');
let Joi = require('joi');
let Schema = require('../schemas');

module.exports = [
  {
    method: 'GET',
    path: '/v1/users',
    config: {
      tags: ['api'],
      description: 'Retrieves all active users',
      response: {
        schema: Joi.array().items(Schema.Users.FULL),
      }
    },
    handler: function(request, reply) {
      usersManager.find({})
        .then(function(users) {
          return reply(users);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'GET',
    path: '/v1/users/:id',
    config: {
      tags: ['api'],
      description: 'Retrieves a user',
      validate: {
        params: {
          id: Joi.string().alphanum().required().description('User\'s Id')
        }
      },
      response: {
        schema: Schema.Users.FULL
      }
    },
    handler: function(request, reply) {
      var id = request.params.id;
      usersManager.find({ _id: id })
        .then(function(user) {
          if (!user) return reply(Boom.notFound('User not found with id: ' + id));
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'POST',
    path: '/v1/users',
    config: {
      tags: ['api'],
      description: 'Create a new User',
      validate: {
        payload: Schema.Users.CREATE
      },
      response: {
        schema: Schema.Users.FULL
      }
    },
    handler: function(request, reply) {
      var user = request.body;

      usersManager.create(user)
        .then(function(user) {
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'PUT',
    path: '/v1/users/:id',
    config: {
      tags: ['api'],
      description: 'Updates a  User',
      validate: {
        params: Joi.object().keys({
          id: Joi.string().required().description('User \'s Id')
        }),
        payload: Schema.Users.USER
      },
      response: {
        schema: Schema.Users.FULL
      }
    },
    handler: function(request, reply) {
      var id = request.params.id;
      var user = request.body;
      user._id = id;
      usersManager.update(user)
        .then(function(user) {
          if (!user) return reply(Boom.notFound('User not found with id: ' + id));
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'DELETE',
    path: '/v1/users/:id',
    config: {
      tags: ['api'],
      description: 'Delete\'s a  User',
      validate: {
        params: Joi.object().keys({
          id: Joi.string().required().description('User \'s Id')
        })
      },
    },
    handler: function(request, reply) {
      var id = request.params.id;
      var user = request.body;
      usersManager.update(id, user)
        .then(function(user) {
          if (!user) {
            return reply(Boom.notFound('User not found with id: ' + id));
          }
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'GET',
    path: '/v1/accounts/:accountId/users',
    config: {
      tags: ['api'],
      description: 'Active users associated with an account',
      validate: {
        params: Joi.object().keys({
          accountId: Joi.string().required().description('Account Id')
        })
      },
      response: {
        schema: Joi.array().items(Schema.Users.FULL),
      }
    },
    handler: function(request, reply) {
      var accountId = request.params.accountId;
      usersManager.findByAccountId(accountId)
        .then(function(users) {
          return reply(users);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  }

];