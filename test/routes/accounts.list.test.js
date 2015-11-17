'use strict';

let expect = require('chai').expect;
let moment = require('moment');
let _ = require('lodash');
let r = require('../../config').r;
let server = require('../../');

describe('/v1/accounts', () => {

  describe('GET: /v1/accounts', () => {

    describe('Accounts Exist', () => {

      beforeEach((done) => {
        r.table('accounts')
         .insert([
           { name: 'Test 1', createdAt: moment().utc().toDate(), updatedAt: moment().utc().toDate(), isActive: true }
         ])
         .run()
         .then(() => done())
         .catch(done);
      });
    });

    it('should return the active accounts', (done) => {
      server.inject('/v1/accounts', res => {
        expect(res.result).to.not.be.empty;
        done();
      });


    });
  });

});
