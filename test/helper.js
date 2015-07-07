'use strict';

process.env.NODE_ENV = 'testing';

var config = require('../config');

global.expect = require('chai').expect;
global.config = config;