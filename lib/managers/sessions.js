'use strict';

let Redis = require('ioredis');
let Promise = require('bluebird');
let Jwt = require('jsonwebtoken');
let config = require('../../config');

const ENCRYPTION_ALGORITHM = 'HS512';
const SECRET_KEY = config.get('ACCOUNTS_SECRET_KEY');
const REDIS_HOST = config.get('ACCOUNTS_REDIS_HOST');
const REDIS_PORT = config.get('ACCOUNTS_REDIS_PORT');
const MINUTES_TO_EXPIRATION = 60 * 24;
const SECONDS_TO_EXPIRATION = MINUTES_TO_EXPIRATION * 60;

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
      expiresInMinutes: MINUTES_TO_EXPIRATION
    });
    return this.redis.setAsync(id, sessionPayload)
      .then(function() {
        return self.redis.pexpireAsync(SECONDS_TO_EXPIRATION)
          .then(self.byId(id));
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
