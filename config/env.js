'use strict';

var path = require('path')
  , nconf = require('nconf');

nconf.argv().env();
nconf.defaults({
  NODE_ENV: 'testing'
});

var environment = nconf.get('NODE_ENV');
var configFile;
if (environment === 'testing') {
  configFile = path.resolve(__dirname, './testing.json');
} else {
  configFile = path.resolve(__dirname, './defaults.json');
}
nconf.file(configFile);

module.exports = nconf;
module.exports.ENV = environment;