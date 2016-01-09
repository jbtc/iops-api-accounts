'use strict';

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
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Site`,

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
    path: PATH.SITES,
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Create Site`,

      validate: {
        params: {
          accountId: Joi.shortid().required()
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
    method: 'PATCH',
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
