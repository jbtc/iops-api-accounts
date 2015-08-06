'use strict';

var Redis = require('ioredis')
  , Promise = require('bluebird')
  , Jwt = require('jsonwebtoken')
  , config = require('../../config');

var ENCRYPTION_ALGORITHM = 'HS512';
var SECRET_KEY = config.get('ACCOUNTS_SECRET_KEY');
var REDIS_HOST = config.get('ACCOUNTS_REDIS_HOST');
var REDIS_PORT = config.get('ACCOUNTS_REDIS_PORT');

class SessionManager {

  constructor() {
    this.redis = new Redis({
      port: REDIS_PORT,
      host: REDIS_HOST
    });
    Promise.promisifyAll(this.redis);
  }
  
  save(id, session) {
    var self = this;
    var sessionPayload = Jwt.sign(session, SECRET_KEY, {
      algorithm: ENCRYPTION_ALGORITHM,
      expiresInMinutes: 720
    });
    return this.redis.setAsync(id, sessionPayload)
      .then(function() {
        return self.get(id);
      });
  }

  byId(id) {
    return this.redis.getAsync(id);
  }

  remove(id) {
    return this.redis.delAsync(id);
  }
}

module.exports = SessionManager;
