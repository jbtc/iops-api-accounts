'use strict';

var expect = require('chai').expect;
var Validator = require('../../lib/utils/validator');

describe('Validator', function() {

  var schema;
  before(function() {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number',
          min: 0
        }
      },
      required: ['name']
    }
  });

  var validator;
  before(function() {
    validator = new Validator();
    expect(validator).to.be.ok;
  });

  describe('valid object', function() {

    it('should pass validation', function() {
      var valid = { name: 'blah', age: 0 };
      var result = validator.validate(valid, schema);
      expect(result.valid).to.be.true;
    });

  });

  describe('invalid object', function() {

    it('should not pass validation', function() {
      var invalid = {};
      var result = validator.validate(invalid, schema);
      console.log(result.error);
      expect(result.valid).to.be.false;
    });

  });
});