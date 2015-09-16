'use strict';

let Joi = require('joi');
let Shared = require('./shared');

module.exports = {

  ACCOUNT: Joi.object().keys({
    _id: Shared.ID,
    name: Joi.string().min(2).max(128).trim().description('Account Name'),
    code: Joi.string().uppercase().trim().description('Airport Code'),
    isActive: Shared.IS_ACTIVE,
  }),

  BASIC: Joi.object().keys({
    name: Joi.string().min(2).max(128).required().trim().description('Account Name'),
    code: Joi.string().min(2).max(4).required().uppercase().trim().description('Airport Code'),
  }),

  UPDATE: Joi.object().keys({
    name: Joi.string().min(2).max(128).optional().trim().description('Account Name'),
    code: Joi.string().min(2).max(4).required().uppercase().trim().description('Airport Code'),
    isActive: Shared.IS_ACTIVE,
  }),

  FULL: Joi.object().keys({
    _id: Shared.ID,
    name: Joi.string().min(2).max(128).trim().description('Account Name'),
    code: Joi.string().trim().description('Airport Code'),
    isActive: Shared.IS_ACTIVE,
    createdAt: Shared.CREATED_AT,
    updatedAt: Shared.UPDATED_AT,
  })
};