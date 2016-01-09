'use strict';

import Joi from '../joi';
import ShortId from 'shortid';
import Moment from 'moment';

export const Id = Joi.object().keys({
  _id: Joi.shortid().default(ShortId.generate())
});

export const Dates = Joi.object().keys({
  createdAt: Joi.date().default(Moment().utc().toDate()),
  updatedAt: Joi.date().default(Moment().utc().toDate())
});

export const IsActive = Joi.object().keys({
  isActive: Joi.boolean().default(true)
});

export const BasicModel = IsActive;
