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
    path: `${VERSION}/claims`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Claims`,

      handler: {
        async: async (request, reply) => {
          try {
            let claims = await Services.claims.find({ accountId: { $exists: false }, isActive: true });
            return reply(claims);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `${VERSION}/claims/{claimId}`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Claim`,

      validate: {
        params: {
          claimId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.id;
          try {

            let claim = await Services.claims.findById(id);
            if(!claim) return reply(Boom.notFound(`Claim ${id} not found`));
            return reply(claim);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },





  {
    path: `${VERSION}/claims/{claimId}`,
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Update Claim`,

      validate: {
        params: {
          claimId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.id;
          try {

            let claim = await Services.claims.findById(id);
            if(!claim) return reply(Boom.notFound(`Claim ${id} not found`));
            return reply(claim);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `${VERSION}/claims/{claimId}`,
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: `Delete Claim`,

      validate: {
        params: {
          claimId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.id;
          try {

            let claim = await Services.claims.findById(id);
            if(!claim) return reply(Boom.notFound(`Claim ${id} not found`));
            return reply(claim);
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
