'use strict';

import Promise from 'bluebird';

export default [
  {
    path: '/v1/sessions',
    method: 'POST',
    config: {
      tags: ['api'],
      description: 'Create a new session',

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
    path: '/v1/sessions/{id}',
    method: 'DELETE',
    config: {
      tags: ['api'],
      description: 'Delete a session',

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
  }
];
