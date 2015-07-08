'use strict';

var expect = require('chai').expect;
var app = require('../../lib');

require('../../config');
var request = require('supertest');
request = request(app);

describe('/v1/system/status', function() {

  it('should be able to get a system status', function(done) {
    request
      .get('/v1/systems/status')
      .expect(200, done);
  });

});