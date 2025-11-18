const sockethandler = (io, db) => {
  io.on("connection", (socket) => {
    console.log("⚡ Socket.IO client connected:", socket.id);

    socket.on("join", (userId) => {
      const room = `user:${userId}`;
      socket.join(room);
      console.log(`🔗 User ${userId} joined room ${room}`);
    });

    socket.on("chat message", (msg) => {
      const { content, sender_id, receiver_id, status } = msg;

      if (!status) {
        console.log("🚫 Skipping offline message attempt:", msg);
        return; // Ignore messages sent without connection
      }

      console.log("📩 Received message:", msg);
      db.run(
        `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`,
        [sender_id, receiver_id, content],
        function (err) {
          if (err) {
            console.error("❌ Error inserting message:", err.message);
            return;
          }

          const messageData = {
            id: this.lastID,
            content,
            sender_id,
            receiver_id,
            status: true,
            created_at: new Date().toISOString(),
          };
         
          io.to(`user:${sender_id}`).emit("new message", messageData);
          io.to(`user:${receiver_id}`).emit("new message", messageData);
        }
      );
    });

    // Send friend request
    socket.on("friends:request:send", ({ fromUserId, toUserId }) => {
      console.log(`📨 Friend request sent from ${fromUserId} → ${toUserId}`);

      io.to(`user:${toUserId}`).emit("friends:request:incoming", {
        fromUserId
      });
    });

    // When friend request accepted or removed
    socket.on("friends:update", ({ userA, userB }) => {
      console.log(`🔄 Friends updated between ${userA} & ${userB}`);
      io.to(`user:${userA}`).emit("friends:updated");
      io.to(`user:${userB}`).emit("friends:updated");
    });

    // Favorite changed only for owner
    socket.on("friends:favorite", ({ userId, friendId, is_favorite }) => {
      console.log(`⭐ Favorite changed by ${userId} for friend ${friendId}`);

      io.to(`user:${userId}`).emit("friends:favorite:changed", {
        friendId,
        is_favorite
      });
    });


    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

export { sockethandler }