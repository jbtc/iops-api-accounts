'use strict';

let Promise = require('bluebird');
let Joi = require('joi');
let Boom = require('boom');
let Managers = require('../lib/managers');
let SCHEMAS = require('../lib/schemas');

module.exports = [
  {
    path: '/v1/users',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'All Users',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users/{id}',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'User by Id',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Create User',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users/{id}',
    method: 'PUT',
    config: {
      tags: ['api'],
      description: 'Update User',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users/{id}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Delete User',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users/forgot',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Forgot Password',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users/{id}/reset',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Forgot Password',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users/{id}/claims',
    method: 'GET',
    config: {
      tags: ['api'],
      description: 'Delete User',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users/{id}/claims',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Delete User',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
  {
    path: '/v1/users/{id}/claims/{claimId}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Delete User',

      //response: {
      //  schema: SCHEMAS.RESPONSES.ACCOUNTS.All
      //},

      handler: {
        async: Promise.coroutine(function* (request, reply) {
          try {
            let result = yield Promise.resolve([]);
            return reply(result);
          } catch (e) {
            return reply(e);
          }
        })
      }
    }
  },
];
