'use strict';
//
let expect = require('chai').expect;
let server = require('../../');
let config = require('../../config');
let db = config.db;
let Hat = require('hat');

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
        token: Hat(),
        active: true,
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
        method: 'GET',
        url: '/v1/accounts',
      };
      server.inject(options, function(response) {
        var result = response.result;
        expect(response.statusCode).to.be.eql(200);
        //
        //expect(result).to.be.eql([{
        //  id: account._id.toString(),
        //  name: 'JBT Testing',
        //  active: true,
        //},]);
        done();
      });
    });
  });

  describe('GET /v1/accounts/{id}', function() {

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
        isActive: true,
      };
      db.collection('accounts').save(account, function(err, account) {
        if (err) return done(err);
        if (account) {
          return done();
        }
      });
    });


    it('should be able to get a known account', function(done) {
      var options = {
        method: 'GET',
        url: '/v1/accounts/' + account._id.toString(),
      };
      server.inject(options, function(response) {
        var result = response.result;
        expect(response.statusCode).to.be.eql(200);
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

    it('should fail with status code 400', function(done) {
      var options = {
        method: 'POST',
        url: '/v1/accounts',
        payload: {},
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.be.eql(400);
        done();
      });
    });

    it('should succeed', function(done) {
      var options = {
        method: 'POST',
        url: '/v1/accounts',
        payload: {
          name: 'Testing Testing Testing',
        },
      };
      server.inject(options, function(response) {
        var result = response.result;
        expect(response.statusCode).to.be.eql(200);
        expect(result.name).to.be.eql('Testing Testing Testing');
        expect(result.isActive).to.be.true;

        done();
      });
    });
  });

  describe('PUT /v1/accounts/{id}', function() {

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
        isActive: true,
      };
      db.collection('accounts').save(account, function(err, account) {
        if (err) return done(err);
        if (account) {
          return done();
        }
      });
    });


    //it('should be able to get a known account', function(done) {
    //  var options = {
    //    method: 'PUT',
    //    url: '/v1/accounts/' + account._id.toString(),
    //    payload: {
    //      _id: account._id,
    //      name: 'Test 123',
    //      isActive: false,
    //    },
    //  };
    //  server.inject(options, function(response) {
    //    var result = response.result;
    //    expect(response.statusCode).to.be.eql(200);
    //    expect(result.name).to.be.eql('Test 123');
    //    expect(result.isActive).to.be.false;
    //    done();
    //  });
    //});
  });

  describe('PATCH /v1/accounts/{id}', function() {

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
        isActive: true,
      };
      db.collection('accounts').save(account, function(err, account) {
        if (err) return done(err);
        if (account) {
          return done();
        }
      });
    });


    it('should be able to get a known account', function(done) {
      var options = {
        method: 'PATCH',
        url: '/v1/accounts/' + account._id.toString(),
        payload: {
          active: false,
        },
      };
      server.inject(options, function(response) {
        var result = response.result;
        expect(response.statusCode).to.be.eql(200);
        expect(result.name).to.be.eql('JBT Testing');
        done();
      });
    });
  });

  describe('DELETE /v1/accounts/{id}', function() {

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
        active: true,
      };
      db.collection('accounts').save(account, function(err, account) {
        if (err) return done(err);
        if (account) {
          return done();
        }
      });
    });


    it('should be able to get a known account', function(done) {
      var options = {
        method: 'DELETE',
        url: '/v1/accounts/' + account._id.toString(),
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.be.eql(200);
        done();
      });
    });
  });

});