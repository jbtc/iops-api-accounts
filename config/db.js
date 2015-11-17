'use strict';

let RethinkDb = require('rethinkdbdash');
let Promise = require('bluebird');
let _ = require('lodash');

module.exports = {

  initialize(name, servers) {
    return RethinkDb({ db: name, servers });
  },

  setupTables(r, dbName, tables) {
    return Promise.resolve(r.db(dbName).tableList().run())
      .then(existing => {
        let newTables = _.difference(existing, tables);
        if (!_.isEmpty(newTables)) {
          let promises = [];
          for (let t of newTables) {
            promises.push(r.db(db).tableCreate(t).run());
          }
          return Promise.all(promises);
        }
      });
  }
};
