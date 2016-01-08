'use strict';

import Joi from 'joi';
import JoiContrib from 'joi-contrib';
import JoiShortId from 'joi-shortid';

Joi.contrib = JoiContrib;
Joi.shortid = JoiShortId;

export default Joi;
