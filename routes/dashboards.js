'use strict';

import Boom from 'boom';
import Services from '../lib/services';
import Joi from '../lib/joi';
import * as Models from '../lib/models';
import _ from 'lodash';

export default [

  {
    path: `/v1/dashboards`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Get active dashboards`,

      handler: {
        async: async (request, reply) => {
          try {
            const results = await Services.dashboards.find({ isActive: true });
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/dashboards/{dashboardId}`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Get a Dashboard`,

      handler: {
        async: async (request, reply) => {
          const id = request.params.dashboardId;
          try {
            let result = await Services.dashboards.findById(id);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/dashboards/{dashboardId}`,
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Update a Dashboard`,

      validate: {
        params: { dashboardId: Joi.shortid().required() },
        payload: Joi.object(_.omit(Models.Dashboard, 'userId')).meta({ className: 'UpdateDashboard' })
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.dashboardId;
          const dashboard = request.payload;
          try {
            let result = await Services.dashboards.update(id, dashboard);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `/v1/dashboards/{dashboardId}`,
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: `Remove Dashboard`,

      validate: {
        params: { dashboardId: Joi.shortid().required() }
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.dashboardId;
          try {
            const result = await Services.dashboards.remove(id);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/users/{userId}/dashboards',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `User's Dashboard`,

      validate: {
        params: { userId: Joi.shortid().required() }
      },

      handler: {
        async: async (request, reply) => {
          const userId = request.params.userId;
          try {
            const results = await Services.dashboards.findByUserId(userId);

            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/users/{userId}/dashboards',
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Create a User's Dashboard`,

      validate: {
        params: { userId: Joi.shortid().required() },
        payload: Joi.object(_.omit(Models.Dashboard, 'isActive')).meta({ className: 'NewDashboard' })
      },

      handler: {
        async: async (request, reply) => {
          const userId = request.params.userId;
          const dashboard = request.payload;

          try {
            const result = await Services.dashboards.create(dashboard, userId);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: '/v1/users/{userId}/dashboards/{dashboardId}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: `Delete a User's Dashboard`,

      validate: {
        params: {
          userId: Joi.shortid().required(),
          dashboardId: Joi.shortid().required()
        }
      },

      handler: {
        async: async (request, reply) => {
          const userId = request.params.userId;
          const dashboardId = request.params.dashboardId;

          try {
            const result = await Services.dashboards.remove(dashboardId, userId);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },


];
