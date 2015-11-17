'use strict';

let Nconf = require('nconf');
let Path = require('path');
let RethinkDB = require('rethinkdbdash');

Nconf.argv()
     .env()
     .file(Path.resolve(__dirname, './defaults.json'));

let r = RethinkDB({
  db: Nconf.get('RDB_DB'),
  servers: [
    { host: Nconf.get('RDB_SERVER_HOST') }
  ]
});

module.exports = { r, nconf: Nconf };
