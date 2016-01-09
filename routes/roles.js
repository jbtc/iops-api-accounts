'use strict';

import Boom from 'boom';
import Services from '../lib/services';
import {BasicUser, User} from '../lib/models/user';
import Joi from '../lib/joi';

const VERSION = `/v1`;

const PREFIX = {
  USER: `${VERSION}/accounts/{accountId}`,
  SITE: `${VERSION}/sites/{siteId}`
};

const PATH = {
  ACCOUNT_DASHBOARDS: `${PREFIX.USER}/roles`,
  SITES_DASHBOARDS: `${PREFIX.SITE}/roles`
};

export default [

  {
    path: `${VERSION}/roles/{roleId}`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Role`,

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
    path: `${VERSION}/roles/{roleId}`,
    method: ['PUT', 'PATCH', 'DELETE'],
    config: {
      tags: ['api'],
      description: `Update Role`,

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
      description: `Account's Roles`,

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
    path: PATH.SITES_DASHBOARDS,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Site's Roles`,

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
