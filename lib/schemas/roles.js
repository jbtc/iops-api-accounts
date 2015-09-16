'use strict';

let Joi = require('joi');
let Shared = require('./shared');

const BASIC = Joi.object().keys({
  name: Joi.string().min(2).required().trim().description('Name'),
  claims: Joi.any(),
  isActive: Shared.IS_ACTIVE
});

const ROLE = BASIC.keys({
  _id: Shared.ID
});

const FULL = ROLE.keys({
  createdAt: Shared.CREATED_AT,
  updatedAt: Shared.UPDATED_AT,
});

module.exports = { BASIC, ROLE, FULL };