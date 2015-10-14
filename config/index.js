'use strict';

let rethink = require('rethinkdbdash');

let r = rethink({
  db: 'iops_accounts_testing',
  servers: [
    { host: 'rethinkdb-master-1.iops.cont.tutum.io', port: 28015 },
    { host: 'rethinkdb-slave-01-1.iops.cont.tutum.io', port: 32787 },
    { host: 'rethinkdb-slave-01-2.iops.cont.tutum.io', port: 32790 },
    { host: 'rethinkdb-slave-01-3.iops.cont.tutum.io', port: 32793 },
    { host: 'rethinkdb-slave-01-4.iops.cont.tutum.io', port: 32796 }
  ]
});

export default r;
