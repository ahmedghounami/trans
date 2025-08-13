import { buyFunction } from "../buyFunction.js";

export default async function buyRoute(fastify, opts) {
  const { db } = opts;

  fastify.post("/buy", async (request, reply) => {
    const { userId, itemName, itemPrice } = request.body;

    try {
      const result = await buyFunction(db, userId, itemName, itemPrice);
      reply.send({ success: true, message: result.message });
    } catch (err) {
      reply.status(400).send({ success: false, error: err.message });
    }
  });
}
