'use strict';

var router = module.exports = require('express').Router();

router.route('/status')
  .get(function(req, resp) {
    resp.send({ status: 'ok '});
  });

