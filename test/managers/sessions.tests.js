'use strict';

let expect = require('chai').expect;
let Jwt = require('jsonwebtoken');
let SessionManager = require('../../lib/managers/sessions');

const SECRET = 'VerySecret';

describe('SessionManager', function() {

  let sessionManager;
  before(function() {
    sessionManager = new SessionManager();
    expect(sessionManager).to.be.ok;
  });

  describe('Redis', function() {

    afterEach(function() {
      sessionManager.remove('tjgarlick@gmail.com');
    });

    it('should be able to save a session', function(done) {
      let payload = { email: 'tjgarlick@gmail.com' };

      sessionManager.save(payload.email, payload)
        .then(function(result) {
          sessionManager.byId(payload.email)
            .then(function(session) {
              expect(result).to.eql(session);
              done();
            });
        })
        .catch(function(err) {
          done(err);
        });
    });

  });

});