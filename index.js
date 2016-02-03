'use strict';

if (process.env.NEW_RELIC_HOME) {
  require('newrelic');
}

require('babel-register');

require('./server');
