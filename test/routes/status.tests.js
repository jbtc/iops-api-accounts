'use strict';

var expect = require('chai').expect;
var server = require('../../');

require('../../config');

describe('/v1/system/status', function() {

  it('should be able to get a system status', function(done) {
    var options = {
      method: "GET",
      url: "/status"
    };
    server.inject(options, function(response) {
      var result = response.result;
      expect(response.statusCode).to.be.eql(200);
      expect(result.running).to.be.true;
      done();
    });
  });

});