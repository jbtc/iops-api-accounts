'use strict';

var AccountsManager = require('../managers/accounts');
var router = module.exports = require('express').Router();
var Errors = require('../errors');
var accountsManager = new AccountsManager();

router.route('/')
  .get(function(req, res, next) {
    accountsManager.find({})
      .then(function(accounts) {
        res.status(200).send(accounts);
      })
      .catch(next);
  })
  .post(function(req, res, next) {
    var account = req.body;
    accountsManager.create(account)
      .then(function(createdAccount) {
        res.status(200).send(createdAccount);
      })
      .catch(Errors.ValidationError, function(err) {
        res.status(400).send(err);
      })
      .catch(next);
  });

router.route('/:id')
  .get(function(req, res, next) {
    accountsManager.byId(req.params.id)
      .then(function(account) {
        if (account)
          return res.status(200).send(account);
        return res.status(404);
      })
      .catch(next);
  })
  .put(function(req, res, next) {
    var account = req.body;
    accountsManager.update(req.params.id, account)
      .then(function(updatedAccount) {
        if (updatedAccount)
          return res.status(200).send(updatedAccount);
        return res.status(404);
      })
      .catch(next);
  })
  .delete(function(req, res, next) {

  });