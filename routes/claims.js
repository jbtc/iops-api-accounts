'use strict';

import Boom from 'boom';
import Services from '../lib/services';
import Joi from '../lib/joi';
import * as Models from '../lib/models';
import _ from 'lodash';

export default [

  {
    path: `/v1/claims`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Claims`,

      handler: {
        async: async (request, reply) => {
          try {
            let claims = await Services.claims.find({accountId: {$exists: false}, isActive: true});
            return reply(claims);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/claims/{claimId}`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Claim`,

      validate: {
        params: {
          claimId: Joi.shortid().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.claimId;
          try {

            let claim = await Services.claims.findById(id);
            if (!claim) return reply(Boom.notFound(`Claim ${id} not found`));
            return reply(claim);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/claims/{claimId}`,
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Update Claim`,

      validate: {
        params: {
          claimId: Joi.shortid().required()
        },
        payload: Joi.object(Models.Claim).optionalKeys('name', 'description', 'accountId')
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.claimId;
          try {
            let claim = request.payload;
            let result = await Services.claims.update(id, claim);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/claims`,
    method: 'POST',
    config: {
      tags: ['api'],
      description: `New Claim`,
      validate: {
        payload: Joi.object(_.omit(Models.Claim, 'isActive'))
      }
    },

    handler: {
      async: async (request, reply) => {
        try {
          const result = await Services.claims.create(request.payload);
          return reply(result);
        } catch (e) {
          return reply(e);
        }
      }
    }
  },

  {
    path: `/v1/claims/{claimId}`,
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
          const id = request.params.claimId;
          try {

            let result = await Services.claims.remove(id);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/accounts/{accountId}/claims',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Account's Claims`,

      validate: {
        params: {
          accountId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const accountId = request.params.accountId;
          try {
            const claims = await Services.claims.find({accountId, isActive: true});
            return reply(claims);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/accounts/{accountId}/claims',
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Account's Claims`,

      validate: {
        params: {
          accountId: Joi.string().required()
        },
        payload: Joi.object(_.omit(Models.Claim, 'siteId', 'accountId'))
      },
      handler: {
        async: async (request, reply) => {
          const accountId = request.params.accountId;
          const claim = request.payload;
          claim.accountId = accountId;

          try {
            const result = await Services.claims.create(claim);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/sites/{siteId}/claims',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Site's Claims`,

      validate: {
        params: {
          siteId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const siteId = request.params.siteId;
          const claim = request.payload;
          claim.siteId = siteId;

          try {
            const result = await Services.claims.create(claim);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/sites/{siteId}/claims',
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Site's Claims`,

      validate: {
        params: {
          siteId: Joi.string().required()
        },
        payload: Joi.object(_.omit(Models.Claim, 'accountId', 'siteId')).meta({className: 'SiteClaim'})
      },

      handler: {
        async: async (request, reply) => {
          const siteId = request.params.siteId;
          const claim = request.payload;
          claim.siteId = siteId;

          try {
            const result = await Services.claims.create(claim);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/claims/{claimId}/users`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Users associated to a claim`,

      validate: {
        params: {
          claimId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const claimId = request.params.claimId;
          const field = `claims.${claimId}`;

          try {
            const claims = Services.claims.find({field: {$exists: true}});
            return reply(claims);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  }

];
