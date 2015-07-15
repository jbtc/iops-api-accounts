'use strict';

var Redis = require('ioredis');

function SessionManager(connection) {
  this.redis = new Redis(connection);
}

module.exports = SessionManager;