'use strict';

import Joi from '../joi';
import {BasicModel} from './shared'

export const BasicAccount = Joi.object().keys({
  name: Joi.string().required().min(2).trim(),
  settings: Joi.object().default({})
});

export const Account = BasicModel.concat(BasicAccount);

