'use strict';

let UsersManager = require('../managers/users');
let usersManager = new UsersManager();
let Boom = require('boom');
let _ = require('lodash');

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
        });
    }
  },

  {
    method: 'GET',
    path: '/v1/users/:id',
    handler: function(request, reply) {
      var id = request.params.id;
      usersManager.find({ _id: id })
        .then(function(user) {
          if (!user) return reply(Boom.notFound('User not found with id: ' + id));
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'POST',
    path: '/v1/users',
    handler: function(request, reply) {
      var user = request.body;

      usersManager.create(user)
        .then(function(user) {
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'PUT',
    path: '/v1/users/:id',
    handler: function(request, reply) {
      var id = request.params.id;
      var user = request.body;
      usersManager.update(id, user)
        .then(function(user) {
          if (!user) return reply(Boom.notFound('User not found with id: ' + id));
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'DELETE',
    path: '/v1/users/:id',
    handler: function(request, reply) {
      var id = request.params.id;
      var user = request.body;
      usersManager.update(id, user)
        .then(function(user) {
          if (!user) {
            return reply(Boom.notFound('User not found with id: ' + id));
          }
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'GET',
    path: '/v1/accounts/:accountId/users',
    handler: function(request, reply) {
      var accountId = request.params.accountId;
      usersManager.findByAccountId(accountId)
        .then(function(users) {
          return reply(users);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'GET',
    path: '/v1/accounts/:accountId/users/:id',
    handler: function(request, reply) {
      var id = request.params.id;
      usersManager.find({ _id: id })
        .then(function(user) {
          if (!user) {
            return reply(Boom.notFound('User not found with id: ' + id));
          }
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'POST',
    path: '/v1/accounts/:accountId/users',
    handler: function(request, reply) {
      var user = request.body;

      usersManager.create(user)
        .then(function(user) {
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  },

  {
    method: 'DELETE',
    path: '/v1/accounts/:accountId/users/:id',
    handler: function(request, reply) {
      var id = request.params.id;
      usersManager.find({ _id: id })
        .then(function(user) {
          if (!user) return reply(Boom.notFound('User not found with id: ' + id));
          return reply(user);
        })
        .catch(function(err) {
          return reply(Boom.badImplementation('Unknown Error', err));
        });
    }
  }

];