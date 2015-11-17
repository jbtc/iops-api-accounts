'use strict';

let expect = require('chai').expect;
let moment = require('moment');
let _ = require('lodash');
let r = require('../../config').r;
let server = require('../../');

describe('/v1/accounts', () => {

  describe('POST: /v1/accounts', () => {

    it('should fail if name is omitted', (done) => {
      const options = {
        method: 'POST',
        url: '/v1/accounts',
        payload: {}
      };

      server.inject(options, (res) => {
        expect(res.result.message).to.match(/name/);
        expect(res.statusCode).to.be.eql(400);
        done();
      });

    });

    it('should work when a valid payload works', (done) => {
      const options = {
        method: 'POST',
        url: '/v1/accounts',
        payload: { name: 'Test 123' }
      };

      server.inject(options, (res) => {
        expect(res.result.name).to.be.eql(options.payload.name);
        expect(res.statusCode).to.be.eql(201);
        done();
      });
    });
  });


});
