'use strict';

import Joi from '../joi';
import {BasicModel} from './shared'

export const BasicSite = Joi.object().keys({
  name: Joi.string().required().min(2).trim(),
  settings: Joi.object().default({})
});

export const Site = BasicModel.concat(BasicSite);
