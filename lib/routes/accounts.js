'use strict';

var AccountsManager = require('../managers/accounts');
var accountsManager = new AccountsManager();
var Boom = require('boom');
var _ = require("lodash");

module.exports = [

  {
    method: 'GET',
    path: '/v1/accounts',
    handler: function(request, reply) {
      accountsManager.find({})
        .then(function(accounts) {
          var dtos = [];
          for (var i = 0; i < accounts.length; i++) {
            var account = accounts[i];
            var dto = _.defaults(_.pick(account, ['name', 'active']), { id: account._id.toString() });
            dtos.push(dto);
          }
          reply(dtos);
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
            var dto = _.defaults(_.pick(account, ['name', 'token', 'active']), { id: account._id.toString() });
            return reply(dto);
          })
          .catch(function(err) {
            return reply(Boom.badImplementation('Unknown Error', err));
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
                  var dto = _.defaults(_.pick(account, ['name', 'active']), { id: account._id.toString() });
                  return reply(dto);
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