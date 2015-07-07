'use strict';

var path = require('path');
var nconf = require('nconf');

nconf
  .argv()
  .env();

var environment = nconf.get('NODE_ENV');

var configFile;
if(environment === 'testing'){
  configFile = path.resolve(__dirname, './testing.json');
} else {
  configFile = path.resolve(__dirname, './defaults.json');
}

nconf.file(configFile);

module.exports = nconf;