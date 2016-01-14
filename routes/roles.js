'use strict';

import Boom from 'boom';
import Services from '../lib/services';
import * as Models from '../lib/models';
import _ from 'lodash';
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
    path: PATH.ACCOUNT_DASHBOARDS,
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Account's Roles`,

      validate: {
        params: { accountId: Joi.shortid().required() },
        payload: Joi.object(_.omit(Models.Role, ['isActive', 'activeId'])).meta({ className: 'NewRole' })
      },

      handler: {
        async: async (request, reply) => {
          let role = request.payload;
          const accountId = request.params.accountId;
          role.accountId = accountId;

          try {
            role = await Services.roles.create(role);
            return reply(role);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `${VERSION}/roles/{roleId}`,
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Update Role`,

      validate: {
        params: { roleId: Joi.shortid().required() },
        payload: Joi.object().keys(_.omit(Models.Role, 'isActive')).meta({ className: 'UpdateRole'})
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
    path: `${VERSION}/roles/{roleId}`,
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
  }


];
