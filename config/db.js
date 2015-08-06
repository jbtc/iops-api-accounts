'use strict';

let mongojs = require('mongojs')
  , env = require('./env');

let db = mongojs(env.get('ACCOUNTS_MONGODB_URI'), []);
db.collection('users').createIndex({ email: 1 }, { unique: true });
//db.collection('users').ensureIndex({ email: 1 }, { unique: true });

module.exports = db;

