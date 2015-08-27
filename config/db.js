'use strict';

let Promise = require('bluebird');
let async = Promise.coroutine;

let mongojs = require('mongojs');
let env = require('./env');

let db = Promise.promisifyAll(mongojs(env.get('ACCOUNTS_MONGODB_URI'), []));


module.exports = db;
module.exports.setup = async(function* () {
  let users = Promise.promisifyAll(db.collection('users'));
  yield users.ensureIndexAsync({ email: 1 }, { unique: true });
});

