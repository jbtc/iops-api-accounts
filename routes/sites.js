'use strict';

import Boom from 'boom';
import Joi from '../lib/joi';
import Services from '../lib/services';

const ROUTE_PREFIX = '/v1/accounts/{accountId}';

const PATH = {
  SITES: `${ROUTE_PREFIX}/sites`,
  SITE: `${ROUTE_PREFIX}/sites/{id}`
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
          accountId: Joi.shortid().required()
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
    path: '/v1/sites/{id}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Site`,

      validate: {
        params: {
          id: Joi.shortid().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.id;
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
          accountId: Joi.shortid().required()
        },
        payload: Joi.object({
          name: Joi.string().required(),
          code: Joi.string().uppercase().required(),
          shortName: Joi.string().required(),
          serverUrl: Joi.string().uri().required(),
          refreshRate: Joi.number().default(5),
          isActive: Joi.boolean().default(true)
        }).meta({ className: 'NewSite' })
      },

      handler: {
        async: async (request, reply) => {
          const accountId = request.params.accountId;
          const site = request.params.payload;
          site.accountId = accountId;

          try {
            const results = Services.sites.find({ isActive: true }, { passwordHash: 0 });
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },


  {
    path: PATH.SITE,
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Update a Site`,

      validate: {
        params: {
          accountId: Joi.shortid().required(),
          id: Joi.shortid().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          try {
            const results = Services.sites.find({ isActive: true }, { passwordHash: 0 });
            return reply(results);
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
          accountId: Joi.shortid().required(),
          id: Joi.shortid().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          try {
            const results = Services.sites.find({ isActive: true }, { passwordHash: 0 });
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },
];
