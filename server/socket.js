const sockethandler = (io, db) => {
  io.on("connection", (socket) => {
    console.log("⚡ Socket.IO client connected:", socket.id);

    socket.on("join", (userId) => {
      const room = `user:${userId}`;
      socket.join(room);
      socket.userId = userId; // Store userId on socket for later use
      console.log(`🔗 User ${userId} joined room ${room}`);
      // Broadcast presence to all clients
      try {
        io.emit('user_presence', { userId, status: 'online' });
      } catch (e) {
        console.error('Error emitting user_presence', e);
      }
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

    // Respond with list of currently connected user IDs
    socket.on('request_online_users', () => {
      try {
        const sockets = Array.from(io.sockets.sockets.values());
        const userIds = sockets
          .map(s => s.userId)
          .filter(id => typeof id !== 'undefined' && id !== null);
        // unique
        const unique = Array.from(new Set(userIds));
        socket.emit('online_users', unique);
      } catch (err) {
        console.error('Error getting online users', err);
        socket.emit('online_users', []);
      }
    });

    socket.on("send_game_invite", ({ recipientId, gameType }) => {
      const senderId = socket.userId;
      
      if (!senderId) {
        console.error("❌ No userId found on socket for game invite");
        return;
      }

      console.log(`🎮 Game invite from ${senderId} to ${recipientId} for ${gameType}`);

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
      // Broadcast offline presence if we have userId
      if (socket.userId) {
        io.emit('user_presence', { userId: socket.userId, status: 'offline' });
      }
    });

    // Re-broadcast profile updates received from clients so other sockets can update UI
    socket.on('profile_updated', (payload) => {
      try {
        const { userId, name, picture } = payload || {};
        console.log('🔁 Received profile_updated from client:', payload);
        // Broadcast to all other clients so they can refresh headers/avatars
        socket.broadcast.emit('user_profile_updated', { userId, name, picture });
        // Also emit to the user's own room so their other sessions/devices receive it
        if (userId) {
          io.to(`user:${userId}`).emit('user_profile_updated', { userId, name, picture });
        }
      } catch (err) {
        console.error('Error handling profile_updated', err);
      }
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
  });
};

export { sockethandler }