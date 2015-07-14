'use strict';

var AccountsManager = require('../managers/accounts');
var accountsManager = new AccountsManager();
var Boom = require('boom');

module.exports = [
  {
    method: 'GET',
    path: '/v1/accounts',
    handler: function(request, reply) {
      accountsManager.find({})
        .then(function(accounts) {
          reply(accounts);
        })
        .catch(function(err) {
          Boom.badImplementation('Unknown Error', err);
        })
    }
  },
  {
    method: 'POST',
    path: '/v1/accounts',
    config: {
      plugins: {
        ratify: {
          payload: require('../schemas/accounts/account')
        }
      },
      handler: function(request, reply) {
        var account = request.payload;
        accountsManager.create(account)
          .then(function(account) {
            reply(account);
          })
          .catch(function(err) {
            Boom.badImplementation('Unknown Error', err);
          });
      }
    }
  },

  {
    method: 'GET',
    path: '/v1/accounts/{id}',
    handler: function(request, reply) {
      var id = request.params.id;
      accountsManager.find({ _id: id })
        .then(function(account) {
          if (!account) {
            return reply(Boom.notFound("Account not found", account));
          } else {
            return reply(account);
          }
        });
    }
  },

  {
    method: 'PUT',
    path: '/v1/accounts/{id}',
    config: {
      plugins: {
        ratify: {
          payload: require('../schemas/accounts/account')
        }
      },
      handler: function(request, reply) {
        var id = request.params.id;
        var account = request.payload;
        accountsManager.update(id, account)
          .then(function(account) {
            if (!account) {
              return reply(Boom.notFound("Account not found", account));
            } else {
              return accountsManager.byId(id)
                .then(function(account) {
                  return reply(account);
                });
            }
          });
      }
    }

  },

  {
    method: 'DELETE',
    path: '/v1/accounts/{id}',
    config: {
      plugins: {
        ratify: {}
      },
      handler: function(request, reply) {
        var id = request.params.id;
        accountsManager.remove(id)
          .then(function(result) {
            if (result.ok) {
              return reply();
            } else {
              return reply(Boom.notFound('Account not found'));
            }

          });
      }
    }

  }

];