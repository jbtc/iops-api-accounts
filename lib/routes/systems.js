'use strict';

var router = module.exports = require('express').Router();

router.route('/status')
  .get(function(req, res) {
    res.status(200).send({ status: 'ok ' })
  });