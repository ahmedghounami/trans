import { handleBuy } from "../handleBuy.js";

export default async function buySkin(fastify, opts) {
  const { db } = opts;

  fastify.post("/buy", async (request, reply) => {
    const { userId, itemId, itemPrice } = request.body;

    try {
      const result = await handleBuy(db, Number(userId), Number(itemId), itemPrice);
      reply.send({ success: true, message: result.message });
    } catch (err) {
      reply.status(400).send({ success: false, error: err.message });
    }
  });
}
