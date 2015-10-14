'use strict';

var Glue = require('glue');
var app = require('./app.json');

app.connections = [{ port: process.env.PORT || 3000 }];

Glue.compose(app, { relativeTo: __dirname }, function (err, server) {
  if (err) throw err;
  server.start(function () {
    console.log('Server started on: ' + server.info.uri);
  });
});
