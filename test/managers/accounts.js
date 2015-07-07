'use strict';

var expect = require('chai').expect;
require('../../config');

var AccountsManager = require('../../lib/managers/accounts');

describe('AccountsManager', function() {
  var manager;
  before(function() {
    manager = new AccountsManager();
    expect(manager).to.be.ok;
  });

  describe('#collection', function() {

    it('should have a collection called accounts', function() {
      expect(manager.collection).to.be.ok;
    });

  });

  describe('#hooks', function() {

    it('should have an empty hooks collection by default', function() {
      expect(manager.hooks).to.be.eql([]);
    });

  });

});