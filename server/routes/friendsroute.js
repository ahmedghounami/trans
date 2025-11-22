import { handleAddFriend } from "../addFriend.js";

export default async function friendRoutes(fastify, opts) {
  const { db, io } = opts;

  fastify.post("/friends", async (request, reply) => {
    const { userId, friendId } = request.body;
    if (!userId || !friendId)
      return reply.status(400).send({ error: "Missing userId or friendId" });

    try {
      const result = await handleAddFriend(db, Number(userId), Number(friendId));

      if (result.autoAccepted) {
        // 🔥 Auto accept happened
        io.to(`user:${userId}`).emit("friends:updated");
        io.to(`user:${friendId}`).emit("friends:updated");

        return reply.send({
          success: true,
          autoAccepted: true,
          message: "You are now friends!",
        });
      }

      // Otherwise normal request
      io.to(`user:${friendId}`).emit("friends:request:incoming", {
        fromUserId: Number(userId),
      });

      reply.send({ success: true, message: result.message });
    } catch (err) {
      reply.status(400).send({ success: false, error: err.message });
    }
  });


  fastify.get("/friends/accepted", (request, reply) => {
    const userId = Number(request.query.userId);
    if (!userId) return reply.status(400).send({ error: "Missing userId" });

    const query = `
      SELECT 
        u.id,
        u.name,
        u.picture,
        u.gold,
        CAST(u.games AS INTEGER) AS games,
        CAST(u.win AS INTEGER) AS win,
        CAST(u.lose AS INTEGER) AS lose
      FROM friends f
      JOIN users u ON u.id = f.friend_id
      WHERE f.user_id = ? AND f.is_request = 0

      UNION ALL

      SELECT 
        u.id,
        u.name,
        u.picture,
        u.gold,
        CAST(u.games AS INTEGER) AS games,
        CAST(u.win AS INTEGER) AS win,
        CAST(u.lose AS INTEGER) AS lose
      FROM friends f
      JOIN users u ON u.id = f.user_id
      WHERE f.friend_id = ? AND f.is_request = 0
    `;

    db.all(query, [userId, userId], (err, rows) => {
      if (err) return reply.status(500).send({ error: "Database error" });

      const updated = rows.map((user) => {
        const level = ((Number(user.win) || 0) / 10).toFixed(1);
        return { ...user, level: parseFloat(level) };
      });

      reply.send({ data: updated });
    });
  });

  fastify.get("/friends/request", (request, reply) => {
    const userId = request.query.userId;
    db.all(
      "SELECT * FROM friends WHERE user_id = ? AND is_request = 1",
      [userId],
      (err, rows) => {
        if (err) return reply.code(500).send({ error: "Database error" });
        reply.send({ data: rows });
      }
    );
  });

  fastify.post("/friends/remove", (request, reply) => {
    const { userId, friendId } = request.body;
    if (!userId || !friendId)
      return reply.status(400).send({ error: "Missing userId or friendId" });

    db.run(
      `
      DELETE FROM friends 
      WHERE (user_id = ? AND friend_id = ?)
         OR (user_id = ? AND friend_id = ?)
    `,
      [userId, friendId, friendId, userId],
      function (err) {
        if (err) return reply.status(500).send({ error: "Database error" });

        io.to(`user:${userId}`).emit("friends:updated");
        io.to(`user:${friendId}`).emit("friends:updated");

        reply.send({ message: "Friend or request removed successfully" });
      }
    );
  });

  fastify.get("/friends/myrequests", (request, reply) => {
    const userId = Number(request.query.userId);
    if (!userId) return reply.status(400).send({ error: "Missing userId" });

    const sql = `
      SELECT u.id, u.name, u.picture
      FROM friends f
      JOIN users u ON u.id = f.user_id
      WHERE f.friend_id = ? AND f.is_request = 1
    `;

    db.all(sql, [userId], (err, rows) => {
      if (err) return reply.status(500).send({ error: "Database error" });
      reply.send({ data: rows });
    });
  });

  fastify.put("/friends/accept", (request, reply) => {
    const { userId, friendId } = request.body;
    if (!userId || !friendId)
      return reply.status(400).send({ error: "Missing userId or friendId" });

    db.run(
      "UPDATE friends SET is_request = 0 WHERE user_id = ? AND friend_id = ?",
      [friendId, userId],
      function (err) {
        if (err) return reply.status(500).send({ error: "Database error" });

        io.to(`user:${userId}`).emit("friends:updated");
        io.to(`user:${friendId}`).emit("friends:updated");

        reply.send({ message: "Friend request accepted!" });
      }
    );
  });
}
