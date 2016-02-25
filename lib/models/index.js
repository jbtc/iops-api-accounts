'use strict';

import Joi from '../joi';
import ShortId from 'shortid';
import Moment from 'moment';
import _ from 'lodash';

export const Shared = {
  _id: Joi.string().optional(),
  isActive: Joi.boolean().default(true).optional()
};

export const Account = _.merge({
  name: Joi.string().required().min(2).trim(),
  settings: Joi.object().default({})
}, Shared);

export const Site = _.merge({
  name: Joi.string().required(),
  code: Joi.string().uppercase().required(),
  shortName: Joi.string().required(),
  serverUrl: Joi.string().uri().required(),
  refreshRate: Joi.number().default(5),
  settings: Joi.object().default({})
}, Shared);

export const User = _.merge({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().lowercase().required(),
  passwordHash: Joi.string(),
  settings: Joi.object().default({}),
  claims: Joi.array().items({}).default([]),
  dashboards: Joi.array().items(Joi.string()).default([]),
  roles: Joi.array().items(Joi.string()).default([])
}, Shared);

export const Claim = _.merge({
  name: Joi.string().required().min(2).trim(),
  description: Joi.string().optional(),
  accountId: Joi.shortid().optional(),
  siteId: Joi.shortid().optional()
}, Shared);

export const Role = _.merge({
  name: Joi.string().required().trim(),
  description: Joi.string().optional(),
  siteId: Joi.shortid().optional(),
  claims: Joi.array().unique().items(Joi.shortid()),
  isGlobal: Joi.boolean().optional().default(false)
}, Shared);

export const Dashboard = _.merge({
  name: Joi.string().required().trim(),
  widgets: Joi.array().items({
    name: Joi.string().required(),
    type: Joi.string().required().default('default'),
    settings: Joi.object().default({}),
    config: Joi.boolean().default(true)
  })
}, Shared);

