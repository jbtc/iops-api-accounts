'use strict';

var Redis = require('ioredis');
var Promise = require('bluebird');
var Jwt = require('jsonwebtoken');
var config = require('../../config');

var ENCRYPTION_ALGORITHM = 'HS512';
var SECRET_KEY = config.get('ACCOUNTS_SECRET_KEY');
var REDIS_HOST = config.get('ACCOUNTS_REDIS_HOST');
var REDIS_PORT = config.get('ACCOUNTS_REDIS_PORT');

function SessionManager() {
  this.redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST
  });
  Promise.promisifyAll(this.redis);
}

SessionManager.prototype.save = function(id, session) {
  var self = this;
  var sessionPayload = Jwt.sign(session, SECRET_KEY, {
    algorithm: ENCRYPTION_ALGORITHM,
    expiresInMinutes: 720
  });
  return this.redis.setAsync(id, sessionPayload)
    .then(function() {
      return self.get(id);
    });
};

SessionManager.prototype.get = function(id) {
  return this.redis.getAsync(id);
};

SessionManager.prototype.delete = function(id) {
  return this.redis.delAsync(id);
};


module.exports = SessionManager;