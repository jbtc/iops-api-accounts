'use strict';

var expect = require('chai').expect;
require('../../config');

var request = require('supertest');

describe('/', function() {

  it('should return hello-world', function(done) {

    request('http://iops-api-accounts.ka')
      .get('/')
      .expect(200)
      .end(function(err, resp) {
        if(err) return done(err);
        expect(resp.body.hello).to.be.eql('world');
        done();
      });

  });

});