'use strict';

let Joi = require('joi');
let Boom = require('boom');
let Jwt = require('jsonwebtoken');
let Moment = require('moment');
let Hat = require('hat');
let SessionsManager = require('../managers/sessions');
let UsersManager = require('../managers/users');
let async = require('bluebird').coroutine;

let sessionManager = new SessionsManager();
let usersManager = new UsersManager();

module.exports = [
  {
    method: 'POST',
    path: '/v1/sessions',

    config: {
      tags: ['api'],
      description: 'Creates a session per the username and password',
      validate: {
        payload: Joi.object().keys({
          email: Joi.string().email().lowercase().required(),
          password: Joi.string().min(7).required()
        })
      }
    },

    handler: async(function* (request, reply) {
      var session = request.payload;

      usersManager.findByEmailAndPassword(session.email, session.password)
        .then(function(user) {
          if (!user) {
            return reply(Boom.notFound('Wrong user name or password'));
          }

          sessionManager.byId(session.email)
            .then(function(existingSession) {
              if (existingSession) {
                return reply(existingSession);
              }
              else {
                var now = Moment();
                var sessionPayload = {
                  jti: Hat(),
                  iss: "iops-accounts",
                  iat: now.unix(),
                  profile: {
                    name: {
                      first: user.firstName,
                      last: user.lastName,
                      full: `${user.firstName} ${user.lastName}`
                    },
                    email: user.email,
                    organizations: user.organizations
                  },
                  //claims: {
                  //  '#/admin': true,
                  //  '#/accounts': {
                  //    admin: true,
                  //    accounts: ['1234']
                  //  },
                  //  '#/users': { admin: true }
                  //}
                };

                sessionManager.save(session.email, sessionPayload)
                  .then(function(session) {
                    return reply(session);
                  })
                  .catch(function(err) {
                    return reply(Boom.badImplementation('Redis Error', err));
                  });
              }
            });
        })
        .catch(function(err) {
          return reply(Boom.notFound(err));
        });


    })
  },

  {
    method: 'DELETE',
    path: '/v1/sessions/:token',
    config: {
      tags: ['api'],
      description: 'Delete the users\'s session by their token',
      validate: {
        params: Joi.object().keys({
          token: Joi.string().required(),
        })
      }
    },

    handler: async(function* (request, reply) {
      var token = request.params.token;
      try {
        yield sessionManager.remove(token);
        return reply();
      } catch (err) {
        return reply(Boom.internal(err.message, err, 500));
      }
    })
  }
];