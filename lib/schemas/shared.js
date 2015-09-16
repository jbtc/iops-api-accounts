'use strict';

let Joi = require('joi');

module.exports = {
  ID: Joi.alternatives().try(Joi.string().description('Id'), Joi.object().description('Id')),
  CREATED_AT: Joi.date().description('Created At'),
  UPDATED_AT: Joi.date().description('Updated At'),
  IS_ACTIVE: Joi.boolean().default(true)
};