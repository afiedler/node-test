const _ = require('lodash');
const Boom = require('boom');
const minWeightPath = require('../../lib/minWeightPath');


module.exports = function rootPostHandler(request, reply) {
  let result;
  try {
    result = minWeightPath(request.payload);
  } catch(ex) {
    return reply(Boom.badRequest(ex.message));
  }

  return reply(result);
};
