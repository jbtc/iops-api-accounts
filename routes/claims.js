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
  ACCOUNT_DASHBOARDS: `${PREFIX.USER}/claims`,
  SITES_DASHBOARDS: `${PREFIX.SITE}/claims`
};

export default [

  {
    path: `${VERSION}/claims/{claimId}`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Claim`,

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
    path: `${VERSION}/claims/{claimId}`,
    method: ['PUT', 'PATCH', 'DELETE'],
    config: {
      tags: ['api'],
      description: `Update Claim`,

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
      description: `Account's Claims`,

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
      description: `Site's Claims`,

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
    path: `${VERSION}/claims/{claimId}/users`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Users associated to a claim`,

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
