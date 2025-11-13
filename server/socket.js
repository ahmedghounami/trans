const sockethandler = (io, db) => {
  io.on("connection", (socket) => {
    console.log("⚡ Socket.IO client connected:", socket.id);

    socket.on("join", (userId) => {
      const room = `user:${userId}`;
      socket.join(room);
      socket.userId = userId; // Store userId on socket for later use
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

    // Handle game invite notification
    socket.on("send_game_invite", ({ recipientId, gameType }) => {
      const senderId = socket.userId;
      
      if (!senderId) {
        console.error("❌ No userId found on socket for game invite");
        return;
      }

      console.log(`🎮 Game invite from ${senderId} to ${recipientId} for ${gameType}`);

      // Get sender info
      db.get("SELECT name, picture FROM users WHERE id = ?", [senderId], (err, sender) => {
        if (err || !sender) {
          console.error("❌ Error fetching sender info:", err);
          return;
        }

        const message = `${sender.name} invited you to play ${gameType}!`;
        const data = JSON.stringify({ gameType, senderId });

        // Save notification to database
        db.run(
          `INSERT INTO notifications (user_id, sender_id, type, message, data) 
           VALUES (?, ?, 'game_invite', ?, ?)`,
          [recipientId, senderId, message, data],
          function (err) {
            if (err) {
              console.error("❌ Error creating notification:", err);
              return;
            }

            const notification = {
              id: this.lastID,
              user_id: recipientId,
              sender_id: senderId,
              type: "game_invite",
              message,
              data,
              is_read: 0,
              created_at: new Date().toISOString(),
              sender_name: sender.name,
              sender_picture: sender.picture,
            };

            // Send real-time notification to recipient
            io.to(`user:${recipientId}`).emit("new_notification", notification);
            console.log(`✅ Notification sent to user ${recipientId}`);

            // Confirm to sender
            socket.emit("game_invite_sent", { success: true, recipientId });
          }
        );
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

export { sockethandler }