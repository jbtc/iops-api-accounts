'use strict';

require('../../config');
var expect = require('chai').expect;

var AbstractManager = require('../../lib/managers/abstract');

describe('AbstractManager', function() {

  describe('setup()', function() {

    it('should call the setup function', function(done) {
      new AbstractManager('abstract', { setup: function() {
        done();
      }});
    });

  });

});