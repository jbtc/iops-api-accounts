'use strict';

let path = require('path');
let nconf = require('nconf');

nconf.argv().env();
nconf.defaults({
  NODE_ENV: 'testing'
});

let environment = nconf.get('NODE_ENV');
let configFile;

if (environment === 'testing') {
  configFile = path.resolve(__dirname, './testing.json');
} else {
  configFile = path.resolve(__dirname, './defaults.json');
}

nconf.file(configFile);

module.exports = nconf;
module.exports.ENV = environment;