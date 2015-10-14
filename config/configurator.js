'use strict';

let nconf = require('nconf');
let path = require('path');

nconf.argv().env().file(path.resolve(__dirname, './defaults.json'));

module.exports = nconf;
