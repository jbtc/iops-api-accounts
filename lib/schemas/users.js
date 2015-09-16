'use strict';

let Joi = require('joi');
let Shared = require('./shared');

const BASIC = Joi.object().keys({
  firstName: Joi.string().min(2).required().description('First Name'),
  lastName: Joi.string().min(2).required().description('Last Name'),
  email: Joi.string().email().required().lowercase().description('Email Address'),
  claims: Joi.object().optional().description('User\'s claims').default({}),
  isActive: Shared.IS_ACTIVE,
});

const USER = BASIC.keys({ id: Shared.ID });

const FULL = USER.keys({
  createdAt: Shared.CREATED_AT,
  updatedAt: Shared.UPDATED_AT,
});

module.exports = { BASIC, USER, FULL };

