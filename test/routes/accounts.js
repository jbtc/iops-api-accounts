'use strict';

var app = require('../../lib');
var config = require('../../config');
var db = config.db;
var ShortId = require('shortid');

require('../../config');
var request = require('supertest');
request = request(app);

describe('/v1/accounts', function() {
  describe('GET: /v1/accounts', function() {
    before(function(done) {
      db.collection('accounts').count({}, function(err, accounts) {
        if (accounts > 0) {
          db.collection('accounts').drop(function(err) {
            if (err) {
              return done(err);
            } else {
              return done();
            }
          });
        } else {
          return done();
        }
      });
    });

    before(function(done) {
      db.collection('accounts').save({
        name: 'JBT Testing',
        token: ShortId.generate(),
        active: true
      }, function(err, account) {
        if (err) return done(err);
        if (account) {
          return done();
        }
      });
    });

    it('should return all the accounts', function(done) {
      request.get('/v1/accounts')
        .expect(200, done);
    });

  });

  describe('POST: /v1/accounts', function() {
    describe('bad request', function() {

      it('should return a 400', function(done) {
        request.post('/v1/accounts')
          .expect(400, done);
      });

    });
  });
});