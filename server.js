'use strict';

const Hapi = require('hapi');
const logger = require('log4js').getLogger('server');
const rootPostHandler = require('./src/handlers/root/post.js');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 4000
});

server.route({
  method: 'POST',
  path: '/',
  handler: rootPostHandler
});

server.start((err) => {
  if(err) {
    logger.error('Error starting server:');
    logger.error(err);
  }

  logger.info(`Server started at ${server.info.uri}`);
});
