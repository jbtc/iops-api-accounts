'use strict';

let Promise = require('bluebird');
let _ = require('lodash');
let RethinkDb = require('rethinkdbdash');
let configurator = require('./configurator');

let verifyDb = (db) => {
  return Promise.resolve(r.dbList().run()
    .then((dbs) => {
      if (!_.contains(dbs, db)) {
        return r.dbCreate(db).run();
      }
    }));
};

let verifyTables = (db, tables) => {
  return Promise.resolve(r.db(db).tableList().run()
    .then((existing) => {
      let newTables = _.difference(existing, tables);
      if (!_.isEmpty(newTables)) {
        let promises = [];
        for (let t of newTables) {
          promises.push(r.db(db).tableCreate(t).run());
        }
        return Promise.all(promises);
      }
      return Promise.resolve();
    }));
};

let config = configurator.get('rethinkdb');
let r = RethinkDb({
  db: config.db,
  servers: config.servers
});

module.exports = r;

module.exports.verify = (db, tables) => {
  return verifyDb(db).then(verifyTables(db, tables));
};

