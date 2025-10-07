// friendRoute.js
import { handleAddFriend } from "../addFriend.js";

export default async function friendRoutes(fastify, opts) {
  const { db } = opts;

  // POST add a friend (send request or auto-accept if already requested)
  fastify.post("/api/friends", async (request, reply) => {
    const { userId, friendId } = request.body;
    if (!userId || !friendId) {
      return reply.status(400).send({ success: false, error: "Missing userId or friendId" });
    }
    try {
      const result = await handleAddFriend(db, Number(userId), Number(friendId));
      reply.send({ success: true, message: result.message });
    } catch (err) {
      reply.status(400).send({ success: false, error: err.message });
    }
  });

  // GET accepted friends
  fastify.get("/api/friends/accepted", (request, reply) => {
    const db = opts.db;
    const userId = Number(request.query.userId);
    console.log("Fetching accepted friends for userId:", userId);
    if (!userId) 
      return reply.status(400).send({ error: "Missing userId" });
    const query = ` SELECT u.id, u.name, u.picture, u.gold, MAX(f.is_favorite) AS is_favorite FROM friends f
                    JOIN users u ON (
                      (u.id = f.friend_id AND f.user_id = ?)
                      OR (u.id = f.user_id AND f.friend_id = ?)
                    )
                    WHERE f.is_request = 0
                    GROUP BY u.id
                `;
    db.all(query, [userId, userId], (err, rows) => {
      if (err) {
        console.error("DB error in /friends/accepted:", err);
        return reply.status(500).send({ error: "Database error" });
      }
      console.log("Fetched rows:", rows);
      reply.send({ data: rows || [] }); // safe fallback
    });
  });

  // GET pending friend requests sent by the user
  fastify.get("/api/friends/request", (request, reply) => {
    const db = opts.db;
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

  // POST remove a friend or cancel a friend request
  fastify.post("/api/friends/remove", async (request, reply) => {
    const { userId, friendId } = request.body;
    if (!userId || !friendId) {
      return reply.status(400).send({ error: "Missing userId or friendId" });
    }
    db.run(
      `DELETE FROM friends 
      WHERE (user_id = ? AND friend_id = ?)
          OR (user_id = ? AND friend_id = ?)`,
      [userId, friendId, friendId, userId], // remove both directions
      function (err) {
        if (err) {
          console.error(err);
          return reply.status(500).send({ error: "Database error" });
        }
        if (this.changes === 0) {
          return reply
            .status(404)
            .send({ error: "No friend or request found to remove" });
        }
        reply.send({ message: "Friend or request removed successfully" });
      }
    );
  });

  // GET pending friend requests sent to me
  fastify.get("/api/friends/myrequests", (request, reply) => {
    const db = opts.db;
    const userId = Number(request.query.userId);
    if (!userId) {
      return reply.status(400).send({ error: "Missing or invalid userId" });
    }
    const sql = `
      SELECT u.id, u.name, u.picture
      FROM friends f
      JOIN users u ON u.id = f.user_id
      WHERE f.friend_id = ? AND f.is_request = 1
    `;
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        console.error("Database error in /api/friends/myrequests:", err);
        return reply.status(500).send({ error: "Database error" });
      }
      reply.send({ data: rows });
    });
  });

  // PUT accept a friend request
  fastify.put("/api/friends/accept", (request, reply) => {
    const db = opts.db;
    const { userId, friendId } = request.body;
    if (!userId || !friendId) return reply.status(400).send({ error: "Missing userId or friendId" });
    db.run(
      "UPDATE friends SET is_request = 0 WHERE user_id = ? AND friend_id = ?",
      [friendId, userId],
      function(err) {
        if (err) return reply.status(500).send({ error: "Database error" });
        if (this.changes === 0)
          return reply.status(404).send({ error: "Request not found" });
        reply.send({ message: "Friend request accepted!" });
      }
    );
  });

  // POST set favorite status to a friend
  fastify.post("/api/friends/setfavorite", async (request, reply) => {
    const { userId, friendId } = request.body;
    if (!userId || !friendId)
      return reply.status(400).send({ error: "Missing userId or friendId" });
    try {
      db.run(
        `UPDATE friends 
        SET is_favorite = 1
        WHERE (user_id = ? AND friend_id = ?)
            OR (user_id = ? AND friend_id = ?)`,
        [userId, friendId, friendId, userId],
        function (err) {
          if (err) {
            console.error(err);
            return reply.status(500).send({ error: "Database error" });
          }
          if (this.changes === 0)
            return reply.status(404).send({ error: "No friend found to set favorite" });

          reply.send({ message: "Friend marked as favorite" });
        }
      );
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: "Internal server error" });
    }
  });

  // POST remove favorite status from a friend
  fastify.post("/api/friends/removefavorite", async (request, reply) => {
    const { userId, friendId } = request.body;
    if (!userId || !friendId)
      return reply.status(400).send({ error: "Missing userId or friendId" });
    try {
      db.run(
        `UPDATE friends 
        SET is_favorite = 0
        WHERE (user_id = ? AND friend_id = ?)
            OR (user_id = ? AND friend_id = ?)`,
        [userId, friendId, friendId, userId],
        function (err) {
          if (err) {
            console.error(err);
            return reply.status(500).send({ error: "Database error" });
          }
          if (this.changes === 0)
            return reply.status(404).send({ error: "No friend found to remove favorite" });

          reply.send({ message: "Friend removed from favorites" });
        }
      );
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: "Internal server error" });
    }
  });
}
