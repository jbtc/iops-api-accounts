'use strict';

let expect = require('chai').expect
  , UsersManager = require('../../lib/managers/users')
  , Promise = require('bluebird')
  , db = Promise.promisifyAll(require('../../config').db)
  , users = Promise.promisifyAll(db.collection('users'));


describe('Users Manager', function() {

  let manager;
  before(function() {
    manager = new UsersManager();
    expect(manager).to.be.ok;
  });

  after(function(done) {
    users.countAsync()
      .then(function(count) {
        if (count > 0) {
          return users.dropAsync();
        }
      })
      .then(function() {
        done();
      });
  });

  describe('empty', function() {

    it('should be able to create a user', function(done) {
      manager.create({ firstName: 'Tyler', lastName: 'Garlick', email: 'tjgarlick@gmail.com', password: 'orange5' })
        .then(function(user) {
          expect(user).to.be.ok;
          done();
        });
    });

  });

  describe('existing user', function() {

    it('should not be able to create a duplicate user', function(done) {
      manager.create({ firstName: 'Tyler', lastName: 'Garlick', email: 'tjgarlick@gmail.com', password: 'orange5' })
        .then(function() {
          done(new Error('Should not throw'));
        })
        .catch(function(e) {
          expect(e.message).to.contain('Email');
          done();
        });
    });

  });

});
