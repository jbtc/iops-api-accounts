'use strict';

var UsersManager = require('../managers/users');
var usersManager = new UsersManager();
var Boom = require('boom');
var _ = require("lodash");

module.exports = [
  {
    method: 'GET',
    path: '/v1/users',
    handler: function(request, reply) {
      usersManager.find({})
        .then(function(users) {
          return reply(users);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        })
    }
  },

  //{
  //  method: 'POST',
  //  path: '/v1/accounts',
  //  config: {
  //    plugins: {
  //      ratify: {
  //        payload: require('../schemas/accounts/account')
  //      }
  //    },
  //    handler: function(request, reply) {
  //      var account = request.payload;
  //      usersManager.create(account)
  //        .then(function(account) {
  //          var dto = _.defaults(_.pick(account, ['name', 'token', 'active']), { id: account._id.toString() });
  //          return reply(dto);
  //        })
  //        .catch(function(err) {
  //          return reply(Boom.badImplementation('Unknown Error', err));
  //        });
  //    }
  //  }
  //},
  //
  //{
  //  method: 'GET',
  //  path: '/v1/accounts/{id}',
  //  handler: function(request, reply) {
  //    var id = request.params.id;
  //    usersManager.find({ _id: id })
  //      .then(function(account) {
  //        if (!account) {
  //          return reply(Boom.notFound("Account not found", account));
  //        } else {
  //          return reply(account);
  //        }
  //      });
  //  }
  //},
  //
  //{
  //  method: 'PUT',
  //  path: '/v1/accounts/{id}',
  //  config: {
  //    plugins: {
  //      ratify: {
  //        payload: require('../schemas/accounts/account')
  //      }
  //    },
  //    handler: function(request, reply) {
  //      var id = request.params.id;
  //      var account = request.payload;
  //      usersManager.update(id, account)
  //        .then(function(account) {
  //          if (!account) {
  //            return reply(Boom.notFound("Account not found", account));
  //          } else {
  //            return usersManager.findById(id)
  //              .then(function(account) {
  //                var dto = _.defaults(_.pick(account, ['name', 'active']), { id: account._id.toString() });
  //                return reply(dto);
  //              });
  //          }
  //        });
  //    }
  //  }
  //
  //},
  //
  //{
  //  method: 'PATCH',
  //  path: '/v1/accounts/{id}',
  //  config: {
  //    plugins: {},
  //    handler: function(request, reply) {
  //      var id = request.params.id;
  //      var account = request.payload;
  //      usersManager.patch(id, account)
  //        .then(function(account) {
  //          if (!account) {
  //            return reply(Boom.notFound("Account not found", account));
  //          } else {
  //            return usersManager.findById(id)
  //              .then(function(account) {
  //                var dto = _.defaults(_.pick(account, ['name', 'active']), { id: account._id.toString() });
  //                return reply(dto);
  //              });
  //          }
  //        });
  //    }
  //  }
  //
  //},
  //
  //{
  //  method: 'DELETE',
  //  path: '/v1/accounts/{id}',
  //  config: {
  //    plugins: {
  //      ratify: {}
  //    },
  //    handler: function(request, reply) {
  //      var id = request.params.id;
  //      usersManager.remove(id)
  //        .then(function(result) {
  //          if (result.ok) {
  //            return reply();
  //          } else {
  //            return reply(Boom.notFound('Account not found'));
  //          }
  //
  //        });
  //    }
  //  }
  //
  //}

];