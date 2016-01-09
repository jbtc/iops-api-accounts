'use strict';

import Joi from 'joi';
import {BasicModel, Dates} from './shared'

export const BasicUser = Joi.object().keys({
  name: {
    first: Joi.string().min(2).required(),
    middle: Joi.string().min(2).optional(),
    last: Joi.string().min(2).required()
  },
  email: Joi.string().required().email().lowercase(),
  settings: Joi.object().default({}),
  claims: Joi.object().default({})
}).meta({ className: 'BasicUser' });

export const User = BasicModel.concat(BasicUser)
                              .concat(Joi.object({
                                passwordHash: Joi.string()
                              }))
                              .meta({ className: 'User' });

