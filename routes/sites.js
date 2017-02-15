'use strict';

import Boom from 'boom';
import Joi from '../lib/joi';
import Services from '../lib/services';
import * as Models from '../lib/models';
import _ from 'lodash';

const ROUTE_PREFIX = '/v1/accounts/{accountId}';

const PATH = {
  SITES: `${ROUTE_PREFIX}/sites`,
  SITE: `${ROUTE_PREFIX}/sites/{siteId}`
};


export default [

  {
    path: PATH.SITES,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Account Sites`,

      validate: {
        params: {
          accountId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const accountId = request.params.accountId;
          try {
            const results = await Services.sites.find({ isActive: true, accountId });
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/sites/{siteId}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Site`,

      validate: {
        params: {
          siteId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.siteId;
          try {
            const result = await Services.sites.findById(id);

            if (!result) {
              return reply(Boom.notFound(`Site ${id} not found`));
            }

            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: PATH.SITES,
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Create Site`,

      validate: {
        params: {
          accountId: Joi.string().required()
        },
        payload: Joi.object(_.omit(Models.Site, 'isActive')).meta({ className: 'NewAccount' })
      },

      handler: {
        async: async (request, reply) => {
          const accountId = request.params.accountId;
          let site = request.payload;
          site.accountId = accountId;

          try {
            const result = await Services.sites.create(site);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/sites/{siteId}`,
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Update a Site`,

      validate: {
        params: {
          siteId: Joi.string().required()
        },
        payload: Joi.object(_.omit(Models.Site, 'isActive', 'accountId')).meta({ className: 'UpdateAccount' })
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.siteId;
          try {
            const result = Services.sites.update(id, request.payload);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: PATH.SITE,
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: `Delete a Site`,

      validate: {
        params: {
          accountId: Joi.string().required(),
          siteId: Joi.string().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const accountId = request.params.accountId;
          const id = request.params.siteId;
          try {
            const results = Services.sites.remove(accountId, id);
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },
];
