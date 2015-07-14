'use strict';

var Util = require('util');


function ValidationError(message, errors) {
  Error.call(this, message);
  this.errors = errors;
}
Util.inherits(ValidationError, Error);

module.exports.ValidationError = ValidationError;