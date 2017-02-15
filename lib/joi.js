'use strict';

import Joi from 'joi';

import JoiShortId from 'joi-shortid';
import JoiContrib from 'joi-contrib'

Joi.extend(JoiShortId);
// Joi.extend(JoiContrib);

Joi.shortid = JoiShortId;
Joi.contrib = JoiContrib;

export default Joi;



