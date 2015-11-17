'use strict';

let Joi = require('joi');
let Moment = require('moment');

let id = Joi.object({
  id: Joi.string().required().description('Id')
});

let dates = Joi.object({
  createdAt: Joi.date().default(Moment().utc().toDate(), 'Created At'),
  updatedAt: Joi.date().default(Moment().utc().toDate(), 'Updated At')
});

let active = Joi.object({
  isActive: Joi.boolean().default(true).description('Active')
});

let activeWithDates = dates.concat(active);

let account = id.concat(Joi.object({
  name: Joi.string().min(2).trim().required().description('Account Name'),
  code: Joi.string().min(2).max(4).uppercase().trim().required().description('Airport Code')
})).concat(activeWithDates).meta({ className: 'Account' });

let MODELS = {
  ACCOUNTS: account
};

let REQUESTS = {
  ACCOUNTS: {
    POST: Joi.object({
      name: Joi.string().min(2).trim().required().description('Account Name'),
      code: Joi.string().min(2).max(4).uppercase().trim().required().description('Airport Code')
    }).meta({ className: 'NewAccount' }).description('Create new Account'),

    PUT: Joi.object({
      name: Joi.string().min(2).trim().optional().description('Account Name'),
      code: Joi.string().min(2).max(4).optional().uppercase().trim().description('Airport Code'),
      isActive: Joi.boolean().optional().description('Active')
    })
  }
};

let RESPONSES = {
  ACCOUNTS: {
    All: Joi.array().items(account).meta({ className: 'Accounts' }),
    POST: account,
    PUT: account
  }
};


module.exports = {
  MODELS,
  REQUESTS,
  RESPONSES
};

