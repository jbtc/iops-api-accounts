module.exports = function() {
  return {
    "files": [
      "config/**/*",
      "lib/**/*.js",
      "index.js"
    ],
    "tests": [
      "test/**/*.js"
    ],
    bootstrap: function(wallaby) {
      require('./test/helper');
    },
    "env": {
      "type": "node"
    },
    "workers": {
      "recycle": true
    },
    "params": {
      "env": "NODE_ENV=testing"
    }
  };
};