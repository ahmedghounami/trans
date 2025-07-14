

const sockethandler = (io, db) => {

io.on('connection', (socket) => {
    console.log('⚡ Socket.IO client connected:', socket.id);
  
    socket.on('join', (userId) => {
      const room = `user:${userId}`;
      socket.join(room);
      console.log(`🔗 User ${userId} joined room ${room}`);
    });
  
    
    socket.on('chat message', (msg) => {
      console.log('📩 Received message:', msg);
      const { content, sender_id, receiver_id } = msg;
      db.run(`INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`, [sender_id, receiver_id, content], function (err) {
        if (err) {
          console.error('Error inserting message:', err.message);
          return;
        }
        const messageData = {
          id: this.lastID,
          content,
          sender_id,
          receiver_id,
          created_at: new Date().toISOString(),
        };
  
        // ✅ Emit to both sender and receiver rooms
        io.to(`user:${sender_id}`).emit("new message", messageData);
        io.to(`user:${receiver_id}`).emit("new message", messageData);
      });
    });
  
    socket.on('disconnect', () => {
      console.log('❌ Socket.IO client disconnected:', socket.id);
    });
  });

}

export{ sockethandler }