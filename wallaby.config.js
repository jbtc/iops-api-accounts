'use strict';

module.exports = function () {
  return {
    files: [
      'index.js',
      'api/**/*',
      'config/**/*',
      'lib/**/*',
      //'routes/**/*',
      'plugins/**/*',
      'test/**/*',
      { pattern: 'test/**/*.test.js', ignore: true }
    ],
    tests: [
      'test/**/*.test.js'
    ],
    env: {
      type: 'node',
      runner: '/usr/local/bin/node'
    },
    params: {
      env: 'NODE_ENV=testing'
    },

    //compilers: {
    //  '**/*.js': wallaby.compilers.babel({
    //    babel: babel,
    //    // other babel options
    //    stage: 0    // https://babeljs.io/docs/usage/experimental/
    //  })
    //},

    teardown: function () {
      require('./config').r.getPoolMaster().drain();
    }
  };
};
