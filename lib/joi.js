'use strict';

import Joi from 'joi';
import JoiShortId from 'joi-shortid';
import JoiContrib from 'joi-contrib'

Joi.shortid = JoiShortId;
Joi.contrib = JoiContrib;

export default Joi;



