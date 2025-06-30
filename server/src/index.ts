import Fastify from 'fastify'

const fastify = Fastify()

fastify.get('/ping', async (request, reply) => {
  reply.send({ message: 'pong' })
})

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log("Fastify server is running on http://localhost:3001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

