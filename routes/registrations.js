'use strict';


import Boom from 'boom';
import Services from '../lib/services';
//import {BasicSite, Site} from '../lib/models/account';
import Joi from '../lib/joi';

export default [

  {
    method: 'POST',
    path: '/v1/registrations',

    config: {
      tags: ['api'],
      description: 'Register for a new account',

      validate: {
        //payload: BasicSite
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          return reply({});
        } catch (e) {
          return await reply(e);
        }
      }
    }
  }
];
