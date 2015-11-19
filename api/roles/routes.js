'use strict';

let Promise = require('bluebird');
let Boom = require('boom');
let Joi = require('joi');
let db = require('../../lib/db');
let ResultHelpers = require('../../lib/db/results');
let ModelHelpers = require('../../lib/models');

const Role = {
  id: Joi.string().description('Id'),
  name: Joi.string().required().min(2).description('Name'),
  description: Joi.string().description('Description'),
  isActive: Joi.bool().description('Active'),
  createdAt: Joi.date().description('Created At'),
  updatedAt: Joi.date().description('Updated At'),
  claims: Joi.object().description('Claims')
};

let applyDefaults = (role) => {
  return new Promise(resolve => {
    role = ModelHelpers.applyBasicDefaults(role);
    role.claims = role.claims || {};
    return resolve(role);
  });
};

module.exports = [

  {
    path: '/v1/roles',
    method: 'GET',
    config: {

      tags: ['api'],
      description: 'All roles',

      validate: {
        query: {
          all: Joi.bool().description('Show All'),
          accountId: Joi.string().description('Account Id')
        }
      },

      response: {
        schema: Joi.array().items(Role)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let query = db.roles;
            if (!request.query.all) {
              query = query.filter({ isActive: true });
            }

            let accountId = request.query.accountId;
            if (accountId) {
              query = query.filter({ accountId });
            }

            let result = yield query.orderBy('name').run();
            return reply(result);

          } catch (e) {
            return reply(Boom.create(500, 'Server Error', e));
          }
        })
      }
    }
  },

  {
    path: '/v1/roles',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Create a role',

      validate: {
        payload: {
          name: Joi.string().required().min(2).description('Name'),
          description: Joi.string().description('Description'),
          accountId: Joi.string().description('Account Id'),
          claims: Joi.object()
        }
      },

      response: {
        schema: Joi.object().keys(Role)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let role = yield applyDefaults(request.payload);
            let result = yield db.roles
                                 .insert(role, { returnChanges: true })
                                 .run();
            role = ResultHelpers.value(result);
            return reply(role).code(201);
          } catch (e) {
            return reply(Boom.create(500, 'Server Error', e));
          }
        })
      }
    }
  },

  {
    path: '/v1/roles/{id}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Role details',

      validate: {
        params: {
          id: Joi.string()
        }
      },

      response: {
        schema: Joi.object().keys(Role)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let claimId = request.params.id;

            let claim = yield db.roles
                                .get(claimId)
                                .run();

            if (!claim) {
              return reply(Boom.notFound(`Role ${claimId} not found`));
            }

            return reply(claim);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },

  {
    path: '/v1/roles/{id}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: 'Role details',

      validate: {
        params: {
          id: Joi.string()
        },
        payload: {
          name: Joi.string().required().min(2).description('Name'),
          description: Joi.string().description('Description'),
          accountId: Joi.string().description('Account Id'),
          isActive: Joi.bool().description('Active'),
          claims: Joi.object()
        }
      },

      response: {
        schema: Joi.object().keys(Role)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let id = request.params.id;
            let role = request.payload;

            let result = yield db.roles
                                 .get(id)
                                 .update(role, { returnChanges: true })
                                 .run();

            if (result.unchanged > 0) {
              let existing = yield db.roles.get(id).run();
              return reply(existing);
            }

            role = ResultHelpers.value(result);
            return reply(role);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },

  {
    path: '/v1/roles/{id}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Delete a role',

      response: {
        schema: Joi.object()
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let id = request.params.id;

            let result = yield db.roles
                                 .get(id)
                                 .delete()
                                 .run();

            if (result.deleted > 0) {
              request.log(['info'], `Role ${id} deleted`);
              return reply({});
            } else {
              request.log(['error'], `Role not found ${id}`);
              return reply(Boom.notFound('Role not found'));
            }
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },


];
