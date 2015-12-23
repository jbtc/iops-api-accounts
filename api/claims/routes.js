'use strict';

let Promise = require('bluebird');
let Joi = require('joi');
let Boom = require('boom');
let db = require('../../lib/db');
let ResultHelpers = require('../../lib/db/results');
let ModelHelpers = require('../../lib/models');

const Claim = {
  id: Joi.string().description('Id'),
  name: Joi.string().required().min(2).description('Name'),
  description: Joi.string().description('Description'),
  createdAt: Joi.date().description('Created At'),
  updatedAt: Joi.date().description('Updated At'),
  isActive: Joi.bool().description('Active'),
  accountId: Joi.string().optional().description('Account Id')
};

const applyDefaults = (claim) => {
  return new Promise(resolve => {
    claim = ModelHelpers.applyBasicDefaults(claim);
    return resolve(claim);
  });
};

module.exports = [
  {
    path: '/v1/claims',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'All claims',

      validate: {
        query: {
          all: Joi.bool().description('Show All'),
          accountId: Joi.string().description('Account Id')
        }
      },

      response: {
        schema: Joi.array().items(Claim)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let filters = {};

            if (!request.query.all) {
              filters.isActive = true;
            }

            let query = db.claims.filter(filters);

            let accountId = request.query.accountId;
            if (accountId) {
              query = query.filter({ accountId });
            }
            let result = yield query.orderBy('name').run();

            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/claims/{id}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Claim details',

      validate: {
        params: {
          id: Joi.string()
        }
      },

      response: {
        schema: Joi.object().keys(Claim)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let claimId = request.params.id;

            let claim = yield db.claims
                                .get(claimId)
                                .run();

            if (!claim) {
              return reply(Boom.notFound(`Claim ${claimId} not found`));
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
    path: '/v1/claims',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Create claim',

      validate: {
        payload: {
          name: Joi.string().required().min(2).description('Name'),
          description: Joi.string().optional().description('Description'),
          accountId: Joi.string().optional().description('Account Id')
        }
      },

      response: {
        schema: Joi.object().keys(Claim)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let claim = yield applyDefaults(request.payload);

            let result = yield db.claims
                                 .insert(claim, { returnChanges: true })
                                 .run();

            claim = ResultHelpers.value(result);
            return reply(claim).code(201);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/claims/{id}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: 'Update a claim',

      validate: {
        payload: {
          name: Joi.string().required().min(2).description('Name'),
          description: Joi.string().optional().description('Description'),
          accountId: Joi.string().optional().description('Account Id')
        }
      },

      response: {
        schema: Joi.object().keys(Claim)
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {

            let claimId = request.params.id;
            let claim = request.payload;
            let result = yield db.claims
                                 .get(claimId)
                                 .update(claim, { returnChanges: true })
                                 .run();

            if(result.unchanged > 0) {
              let existingClaim = yield db.claims.get(claimId).run();
              return reply(existingClaim);
            }

            claim = ResultHelpers.value(result);
            return reply(claim);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/claims/{id}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Delete claim',

      response: {
        schema: Joi.object()
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let id = request.params.id;

            let result = yield db.claims
                                 .get(id)
                                 .delete()
                                 .run();

            if (result.deleted > 0) {
              request.log(['info'], `Claim ${id} deleted`);
              return reply({});
            } else {
              request.log(['error'], `User not found ${id}`);
              return reply(Boom.notFound('Claim not found'));
            }
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  }
];
