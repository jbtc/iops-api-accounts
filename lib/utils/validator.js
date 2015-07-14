'use strict';

var tv4 = require('tv4');
var _ = require('lodash');
var Assert = require('assert-plus');

function Validator(schemas) {
  this.schemas = schemas || [];
}

Validator.prototype.validate = function(data, schema) {
  Assert.object(data, 'data');
  Assert.object(schema, 'schema');

  if (this.schemas.length > 0) {
    _.forEach(this.schemas, function(additional) {
      tv4.addSchema(additional.url, additional.schema);
    });
  }

  return tv4.validateMultiple(data, schema);
};

module.exports = Validator;