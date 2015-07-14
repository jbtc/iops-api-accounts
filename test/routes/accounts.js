'use strict';
//
var expect = require('chai').expect;
var server = require('../../');
var config = require('../../config');
var db = config.db;
var ShortId = require('shortid');

require('../../config');

describe('/v1/accounts', function() {


  describe('GET /v1/accounts', function() {

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
    var account;
    before(function(done) {
      account = {
        name: 'JBT Testing',
        token: ShortId.generate(),
        active: true
      };
      db.collection('accounts').save(account, function(err, account) {
        if (err) return done(err);
        if (account) {
          return done();
        }
      });
    });


    it('should return an array of accounts', function(done) {
      var options = {
        method: "GET",
        url: "/v1/accounts"
      };
      server.inject(options, function(response) {
        var result = response.result;
        expect(response.statusCode).to.be.eql(200);
        expect(result).to.be.eql([account]);
        done();
      });
    });
  });

  describe('POST /v1/accounts', function() {

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
    var account;
    before(function(done) {
      account = {
        name: 'JBT Testing',
        token: ShortId.generate(),
        active: true
      };
      db.collection('accounts').save(account, function(err, account) {
        if (err) return done(err);
        if (account) {
          return done();
        }
      });
    });


    it('should return an array of accounts', function(done) {
      var options = {
        method: "POST",
        url: "/v1/accounts",
        payload: {}
      };
      server.inject(options, function(response) {
        var result = response.result;
        expect(response.statusCode).to.be.eql(400);
        done();
      });
    });
  });

});