"use strict";
const wss   = require('./game');
const fastify = require('fastify');
const cors = require('@fastify/cors');

const server = fastify();

// Register CORS
server.register(cors, {
  origin: 'http://localhost:3000',
});

server.get('/ping', async (request, reply) => {
  return 'pong\n';
});


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
