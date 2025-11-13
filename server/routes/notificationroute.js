const schemaGetNotifications = {
  querystring: {
    type: "object",
    properties: {
      userId: { type: "integer" },
    },
    required: ["userId"],
  },
};

const schemaMarkAsRead = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  querystring: {
    type: "object",
    properties: {
      userId: { type: "integer" },
    },
    required: ["userId"],
  },
};

export default async function notificationRoutes(fastify, options) {
  const { db } = options;

  // GET /notifications - Fetch all notifications for a user
  fastify.get("/notifications", { schema: schemaGetNotifications }, async (request, reply) => {
    const { userId } = request.query;

    return new Promise((resolve, reject) => {
      db.all(
        `SELECT n.*, u.name as sender_name, u.picture as sender_picture 
         FROM notifications n 
         LEFT JOIN users u ON n.sender_id = u.id 
         WHERE n.user_id = ? 
         ORDER BY n.created_at DESC 
         LIMIT 50`,
        [userId],
        (err, rows) => {
          if (err) {
            console.error("Error fetching notifications:", err);
            reject(err);
          } else {
            resolve(rows || []);
          }
        }
      );
    });
  });

  // PUT /notifications/:id/read - Mark notification as read
  fastify.put("/notifications/:id/read", { schema: schemaMarkAsRead }, async (request, reply) => {
    const { id } = request.params;
    const { userId } = request.query;

    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?",
        [id, userId],
        function (err) {
          if (err) {
            console.error("Error marking notification as read:", err);
            reject(err);
          } else {
            resolve({ success: true, changes: this.changes });
          }
        }
      );
    });
  });

  // DELETE /notifications/:id - Delete a notification
  fastify.delete("/notifications/:id", { schema: schemaMarkAsRead }, async (request, reply) => {
    const { id } = request.params;
    const { userId } = request.query;

    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM notifications WHERE id = ? AND user_id = ?",
        [id, userId],
        function (err) {
          if (err) {
            console.error("Error deleting notification:", err);
            reject(err);
          } else {
            resolve({ success: true, deleted: this.changes });
          }
        }
      );
    });
  });
}
