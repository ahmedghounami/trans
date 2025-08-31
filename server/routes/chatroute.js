const schemasearch = {
  querystring: {
    type: "object",
    properties: {
      search: { type: "string" },
    },
    required: ["search"],
  },
};

const schemasendmessage = {
  body: {
    type: "object",
    properties: {
      sender_id: { type: "integer" },
      receiver_id: { type: "integer" },
      content: { type: "string" },
    },
    required: ["sender_id", "receiver_id", "content"],
  },
};

const schemagetmessages = {
  params: {
    type: "object",
    properties: {
      sender_id: { type: "integer" },
      receiver_id: { type: "integer" },
    },
    required: ["sender_id", "receiver_id"],
  },
};
const schemalastmessage = {
  params: {
    type: "object",
    properties: {
      sender_id: { type: "integer" },
      receiver_id: { type: "integer" },
    },
    required: ["sender_id", "receiver_id"],
  },
};

export default async function chatRoutes(fastify, opts) {
  const db = opts.db;

  fastify.get("/api/search",schemasearch, async (req, reply) => {
    const { search } = req.query;
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM users WHERE name LIKE ?`,
        [`%${search || ""}%`],
        (err, rows) => {
          if (err) {
            console.error("Get users error:", err.message);
            reply.status(500).send({ error: "Database error" });
            return reject(err);
          }
          resolve(rows);
        }
      );
    });
  });

  fastify.post("/api/users", async (req, reply) => {
    const { name, picture } = req.body;
    console.log("Creating user:", name, picture);
    if (!name || !picture)
      return reply.status(400).send({ error: "Name and picture are required" });

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR IGNORE INTO users (name, picture) VALUES (?, ?)`,
        [name, picture],
        function (err) {
          if (err) {
            console.error("Insert user error:", err.message);
            reply.status(500).send({ error: "Database error" });
            return reject(err);
          }
          resolve({ id: this.lastID, name });
        }
      );
    });
  });

  // Insert message
  fastify.post("/api/messages",schemasendmessage, async (req, reply) => {
    const { sender_id, receiver_id, content } = req.body;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`,
        [sender_id, receiver_id, content],
        function (err) {
          if (err) {
            reply.status(500).send({ error: "Database error" });
            return reject(err);
          }
          resolve({ id: this.lastID, sender_id, receiver_id, content });
        }
      );
    });
  });

  // Get all messages
  fastify.get("/api/messages", async (req, reply) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM messages`, [], (err, rows) => {
        if (err) {
          reply.status(500).send({ error: "Database error" });
          return reject(err);
        }
        resolve(rows);
      });
    });
  });

  // Get messages between two users
  fastify.get("/api/messages/:sender_id/:receiver_id",schemagetmessages, async (req, reply) => {
    const { sender_id, receiver_id } = req.params;
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)`,
        [sender_id, receiver_id, receiver_id, sender_id],
        (err, rows) => {
          if (err) {
            reply.status(500).send({ error: "Database error" });
            return reject(err);
          }
          resolve(rows);
        }
      );
    });
  });

  // Get last message between two users
  fastify.get("/api/lastmessage/:sender_id/:receiver_id",schemalastmessage, async (req, reply) => {
    const { sender_id, receiver_id } = req.params;

    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM messages 
             WHERE (sender_id = ? AND receiver_id = ?) 
                OR (sender_id = ? AND receiver_id = ?) 
             ORDER BY created_at DESC LIMIT 1`,
        [sender_id, receiver_id, receiver_id, sender_id],
        (err, row) => {
          if (err) {
            reply.status(500).send({ error: "Database error" });
            return reject(err);
          }

          if (!row) {
            // 👇 Always send a JSON object, even if empty
            reply.send({ content: "" });
            return resolve();
          }

          // ✅ Message found, send it
          reply.send({ content: row.content });
          resolve();
        }
      );
    });
  });
}
