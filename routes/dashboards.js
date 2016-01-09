'use strict';

import Boom from 'boom';
import Services from '../lib/services';
import {BasicUser, User} from '../lib/models/user';
import Joi from '../lib/joi';

const VERSION = `/v1`;

const PREFIX = {
  USER: `${VERSION}/users/{userId}`
};

const PATH = {
  ACCOUNT_DASHBOARDS: `${PREFIX.USER}/dashboards`
};

export default [

  {
    path: `${VERSION}/dashboards/{dashboardId}`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Dashboard`,

      handler: {
        async: async (request, reply) => {
          try {
            return reply({});
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `${VERSION}/dashboards/{dashboardId}`,
    method: ['PUT', 'PATCH', 'DELETE'],
    config: {
      tags: ['api'],
      description: `Update Dashboard`,

      handler: {
        async: async (request, reply) => {
          try {
            return reply({});
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: PATH.ACCOUNT_DASHBOARDS,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `User's Dashboard`,

      handler: {
        async: async (request, reply) => {
          try {
            return reply([]);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: PATH.ACCOUNT_DASHBOARDS,
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Create Dashboard`,

      handler: {
        async: async (request, reply) => {
          try {
            return reply([]);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  }


];
