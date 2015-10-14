'use strict';

let Promise = require('bluebird');
let Joi = require('joi');
let Boom = require('boom');
let Managers = require('../lib/managers');
let SCHEMAS = require('../lib/schemas');

module.exports = [
  {
    path: '/v1/accounts',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'All accounts',

      response: {
        schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Managers.Accounts.active().run();
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/accounts',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Creates a new account',

      validate: {
        payload: SCHEMAS.REQUESTS.ACCOUNTS.POST
      },

      response: {
        schema: SCHEMAS.RESPONSES.ACCOUNTS.POST
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Managers.Accounts.create(request.payload);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/accounts/{id}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Retrieves an account by Id',

      validate: {
        params: {
          id: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Managers.Accounts.byId(request.params.id).run();
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  },
  {
    path: '/v1/accounts/{id}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: 'Updates an account',
      validate: {

        params: {
          id: Joi.string().required().description('Account Id')
        },

        payload: SCHEMAS.REQUESTS.ACCOUNTS.PUT
      },

      response: {
        schema: SCHEMAS.RESPONSES.ACCOUNTS.PUT
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Managers.Accounts.update(request.params.id, request.payload);
            return reply(result);
          } catch (e) { return reply(e); }
        })
      }
    }
  },
  {
    path: '/v1/accounts/{id}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Removes an account',
      validate: {
        params: {
          id: Joi.string().required().description('Account Id')
        }
      },
      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Managers.Accounts.removeById(request.params.id).run();
            if (result.deleted == 1) {
              return reply({});
            } else {
              return reply(Boom.notFound(`Account with id ${request.params.id} not found`));
            }
          }
          catch (e) { return reply(e);}
        })
      }
    }
  },
  {
    path: '/v1/accounts/{accountId}/users',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Account's Users`,

      validate: {
        params: {
          accountId: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  },
  {
    path: '/v1/accounts/{accountId}/users',
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Associate User to Account`,

      validate: {
        params: {
          accountId: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  },
  {
    path: '/v1/accounts/{accountId}/users/{userId}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: `Remove User from Account`,

      validate: {
        params: {
          accountId: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  },
  {
    path: '/v1/accounts/{accountId}/claims',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Account's Users`,

      validate: {
        params: {
          accountId: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  },
  {
    path: '/v1/accounts/{accountId}/claims',
    method: 'POST',
    config: {
      tags: ['api'],
      description: `Associate User to Account`,

      validate: {
        params: {
          accountId: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  },
  {
    path: '/v1/accounts/{accountId}/claims/{claimId}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: `Remove User from Account`,

      validate: {
        params: {
          accountId: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  },
  {
    path: '/v1/accounts/{accountId}/claims/{claimId}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: `Remove User from Account`,

      validate: {
        params: {
          accountId: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  },
  {
    path: '/v1/accounts/{accountId}/claims/{claimId}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: `Remove User from Account`,

      validate: {
        params: {
          accountId: Joi.string().required().description('Account Id')
        }
      },

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            if (!result) return reply(Boom.notFound('Account not found'));
            return reply(result);
          } catch (e) { return reply(e);}

        })
      }
    }
  }
];
