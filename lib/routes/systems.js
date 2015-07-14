'use strict';

module.exports = [
  {
    path: '/v1/systems/status',
    method: 'GET',
    handler: function(request, reply) {
      reply({ status: 'ok ' });
    }
  }
];