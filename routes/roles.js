'use strict';

import Boom from 'boom';
import Services from '../lib/services';
import * as Models from '../lib/models';
import _ from 'lodash';
import Joi from '../lib/joi';

export default [

  {
    path: '/v1/roles',
    method: 'GET',
    config: {
      tags: ['api', 'v1'],
      description: 'Roles'
    },
    handler: {
      async: async (request, reply) => {
        try {
          const roles = await Services.roles.find({ isGlobal: true });
          return reply(roles);
        } catch (e) {
          return reply(e);
        }
      }
    }
  },

  {
    path: '/v1/roles',
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Create Global Roles`,

      validate: {
        payload: Joi.object(_.omit(Models.Role, ['isActive', 'accountId'])).meta({ className: 'NewRole' })
      },

      handler: {
        async: async (request, reply) => {
          const role = request.payload;
          role.isGlobal = true;

          try {
            const result = await Services.roles.create(role);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/roles/{roleId}`,
    method: 'GET',


    config: {
      tags: ['api'],
      description: `Role`,

      validate: {
        params: {
          roleId: Joi.shortid()
        }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.roleId;
          try {
            const results = Services.roles.findById(id);
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/roles/{roleId}`,
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Update Role`,

      validate: {
        params: { roleId: Joi.shortid().required() },
        payload: Joi.object().keys(_.omit(Models.Role)).meta({ className: 'UpdateRole' })
      },

      handler: {
        async: async (request, reply) => {
          let role = request.payload;
          const id = request.params.roleId;
          try {
            let result = await Services.roles.update(id, role);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/roles/{roleId}`,
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: `Delete a Role`,

      validate: {
        params: { roleId: Joi.shortid().required() }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.roleId;
          try {
            let result = await Services.roles.remove(id);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/sites/{siteId}/roles',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Account's Roles`,

      validate: {
        params: { siteId: Joi.shortid().required() }
      },

      handler: {
        async: async (request, reply) => {
          const siteId = request.params.siteId;

          try {
            const roles = await Services.roles.find({ siteId, isActive: true });
            return reply(roles);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/sites/{siteId}/roles',
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Site's Roles`,

      validate: {
        params: { siteId: Joi.shortid().required() },
        payload: Joi.object(_.omit(Models.Role, ['isActive', 'isGlobal'])).meta({ className: 'NewRole' }).meta({ className: 'SiteRole' })
      },

      handler: {
        async: async (request, reply) => {
          let role = request.payload;
          role.siteId = request.params.siteId;

          try {
            role = await Services.roles.create(role);
            return reply(role);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  }


];
