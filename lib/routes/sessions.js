'use strict';

var Joi = require('joi');
var Jwt = require('jsonwebtoken');
var config = require('../../config');
var Moment = require('moment');
var Hat = require('hat');

var ENCRYPTION_ALGORITHM = 'HS512';
var SECRET_KEY = config.get('ACCOUNTS_SECRET_KEY');

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

    handler: function(request, reply) {
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
          email: session.email,
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

      var token = Jwt.sign(sessionPayload, SECRET_KEY, {
        algorithm: ENCRYPTION_ALGORITHM,
        expiresInMinutes: 720
      });
      reply({ token: token, decoded: Jwt.decode(token) });
    }
  }
];