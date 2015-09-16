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
      runner: 'node'
    },
    params: {
      env: 'NODE_ENV=testing'
    },
    workers: {
      recycle: true
    }
  };
};
