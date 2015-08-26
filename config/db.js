'use strict';

let Promise = require('bluebird');
let async = Promise.coroutine;

let mongojs = require('mongojs');
let env = require('./env');

let db = Promise.promisifyAll(mongojs(env.get('ACCOUNTS_MONGODB_URI'), []));
let users = Promise.promisifyAll(db.collection('users'));

module.exports = db;
module.exports.setup = async(function* () {
  yield users.ensureIndexAsync({ email: 1 }, { unique: true });
});

