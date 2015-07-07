'use strict';

var request = require('supertest');
var app = require('../../lib');

describe('/', function() {

  it('should return hello-world', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.hello).to.be.eql('world');
        done();
      });
  });

});