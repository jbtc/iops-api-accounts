'use strict';

let Nconf = require('nconf');
let Path = require('path');
let RethinkDB = require('rethinkdbdash');

Nconf.argv()
     .env()
     .file(Path.resolve(__dirname, './defaults.json'));


let dbConfig = Nconf.get('rethinkdb');

let r = RethinkDB({ db: dbConfig.db, servers: dbConfig.servers });

module.exports = { r, nconf: Nconf };
