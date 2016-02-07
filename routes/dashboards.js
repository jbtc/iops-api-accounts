'use strict';

import Boom from 'boom';
import Services from '../lib/services';
import Joi from '../lib/joi';
import * as Models from '../lib/models';
import _ from 'lodash';

const VERSION = `/v1`;

const PREFIX = {
  ACCOUNT: `${VERSION}/users/{userId}`
};

const PATH = {
  ACCOUNT_CLAIMS: `${PREFIX.ACCOUNT}/dashboards`
};

export default [

  {
    path: `${VERSION}/dashboards`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Dashboards`,

      handler: {
        async: async (request, reply) => {
          try {
            const results = Services.dashboards.find({isActive: true});
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `${VERSION}/dashboards/{dashboardId}`,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Dashboard`,

      handler: {
        async: async (request, reply) => {
          const id = request.params.dashboardId;
          try {
            let result = Services.dashboards.findById(id);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `${VERSION}/dashboards/{dashboardId}`,
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Dashboard`,

      validate: {
        params: {dashboardId: Joi.shortid().required()},
        payload: Joi.object(_.omit(Models.Dashboard, 'userId')).meta({className: 'UpdateDashboard'})
      },

      handler: {
        async: async (request, reply) => {
          const id = request.params.dashboardId;
          const dashboard = request.payload;
          try {
            let result = Services.dashboards.update(id, dashboard);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: `${VERSION}/dashboards/{dashboardId}`,
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: `Remove Dashboard`,

      validate: {
        params: {dashboardId: Joi.shortid().required()}
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
    path: PATH.ACCOUNT_CLAIMS,
    method: 'GET',
    config: {
      tags: ['api'],
      description: `User's Dashboard`,

      validate: {
        params: {userId: Joi.shortid().required()}
      },

      handler: {
        async: async (request, reply) => {
          const userId = request.params.userId;
          try {

            const results = Services.dashboards.find({isActive: true, userId});
            return reply(results);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  },

  {
    path: PATH.ACCOUNT_CLAIMS,
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Create Dashboard`,

      validate: {
        params: {userId: Joi.shortid().required()},
        payload: Joi.object(_.omit(Models.Dashboard, 'isActive')).meta({className: 'NewDashboard'})
      },

      handler: {
        async: async (request, reply) => {
          const userId = request.params.userId;
          let dashboard = _.merge(request.payload, {userId});

          try {
            const result = Services.dashboards.create(dashboard);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        }
      }
    }
  }


];
