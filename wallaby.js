'use strict';

module.exports = function() {
  return {
    files: [
      'config/**/*',
      'lib/**/*',
      'index.js'
    ],
    tests: [
      'test/**/*.tests.js'
    ],
    env: {
      type: 'node',
      runner: '/Users/tylergarlick/.nvm/versions/io.js/v3.0.0/bin/node'
    },
    params: {
      env: 'NODE_ENV=testing'
    },
    workers: {
      recycle: true
    }
  };
};