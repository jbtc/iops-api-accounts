module.exports = wallaby => ({

  files: [
    'index.js',
    'api/**/*',
    'config/**/*',
    'lib/**/*',
    //'routes/**/*',
    'plugins/**/*',
    'test/**/*', {
      pattern: 'test/**/*.test.js',
      ignore: true
    }
  ],

  tests: [
    'test/**/*.test.js'
  ],


  env: {
    type: 'node'
  },

  params: {
    env: 'NODE_ENV=testing'
  },

  compilers: {
    '**/*.js': wallaby.compilers.babel()
  },

  setup() {
    require('babel-polyfill');
  },

  teardown(wallaby) {

  }

});
