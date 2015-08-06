'use strict';

var AbstractManager = require('./abstract');

/**
 * Claims Manager
 */
class ClaimsManager extends AbstractManager {

  /**
   * @public
   * @constructor
   */
  constructor() {
    super('claims');
  }
}

module.exports = ClaimsManager;