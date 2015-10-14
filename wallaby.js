'use strict';

var babel = require('babel');

module.exports = function (wallaby) {
  return {
    files: [
      'config/**/*',
      'lib/**/*',
      'routes/**/*',
      'test/**/*',
      { pattern: 'test/**/*.test.js', ignore: true }
    ],
    tests: [
      'test/**/*.test.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    params: {
      env: 'NODE_ENV=testing'
    },
    bootstrap: function () {
      require('./test/helper');
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: babel,
        // other babel options
        stage: 0    // https://babeljs.io/docs/usage/experimental/
      })
    },

    teardown: function () {
      require('./config').getPoolMaster().drain();
    }
  };
};
