'use strict';

var AccountsManager = require('../managers/accounts');
var accountsManager = new AccountsManager();
var Boom = require('boom');

module.exports = [
  {
    path: '/v1/accounts',
    method: 'GET',
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
    path: '/v1/accounts',
    method: 'POST',

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

  }
];

//
//router.get('/', function(req, res, next) {
//  accountsManager.find({})
//    .then(function(accounts) {
//      return res.json(accounts);
//    })
//    .catch(next);
//});
//
//router.post('/', function(req, res, next) {
//  var account = req.body || {};
//  var result = validator.validate(account, accountSchema);
//  if (result.valid) {
//    accountsManager.create(account)
//      .then(function(createdAccount) {
//        return res.status(200).send(createdAccount);
//      })
//      .catch(next);
//  } else {
//    return res.status(400).send(result.errors);
//  }
//});
//
//
////router.route('/:id')
////  .get(function(req, res, next) {
////    accountsManager.byId(req.params.id)
////      .then(function(account) {
////        if (account)
////          return res.status(200).send(account);
////        return res.status(404);
////      })
////      .catch(next);
////  })
////  .put(function(req, res, next) {
////    var account = req.body;
////    accountsManager.update(req.params.id, account)
////      .then(function(updatedAccount) {
////        if (updatedAccount)
////          return res.status(200).send(updatedAccount);
////        return res.status(404);
////      })
////      .catch(next);
////  })
////  .delete(function(req, res, next) {
////
////  });
//
//module.exports = router;