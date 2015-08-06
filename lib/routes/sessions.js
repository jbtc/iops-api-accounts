'use strict';

var Joi = require('joi');
var Jwt = require('jsonwebtoken');
var Moment = require('moment');
var Hat = require('hat');
var SessionsManager = require('../managers/sessions');
var async = require('bluebird').coroutine;

var sessionManager = new SessionsManager();

module.exports = [
  {
    method: 'POST',
    path: '/v1/sessions',

    config: {
      validate: {
        payload: Joi.object().keys({
          email: Joi.string().email().lowercase().required(),
          password: Joi.string().min(7).required()
        })
      }
    },

    handler: async(function* (request, reply) {
      var session = request.payload;

      var now = Moment();
      var sessionPayload = {
        jti: Hat(),
        iss: "iops-accounts",
        iat: now.unix(),
        profile: {
          name: {
            first: 'Tyler',
            last: 'Garlick',
            full: 'Tyler Garlick'
          },
          email: session.email
        },
        claims: {
          '#/admin': true,
          '#/accounts': {
            admin: true,
            accounts: ['1234']
          },
          '#/users': { admin: true }
        }
      };

      sessionManager.save(session.email, sessionPayload)
        .then(function(session) {
          reply({ token: session, decoded: Jwt.decode(session) });
        });
    })
  }
];