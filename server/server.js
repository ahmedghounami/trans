import Fastify from 'fastify';
import cors from '@fastify/cors';
import sqlite3 from 'sqlite3';
import { createServer } from 'http';
import { Server } from 'socket.io';

const fastify = Fastify();

await fastify.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});



// Connect SQLite DB
const db = new sqlite3.Database('sqlite.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite DB');
  }
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      picture TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      `);
  db.run(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sender_id INTEGER NOT NULL,
          receiver_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sender_id) REFERENCES users(id),
          FOREIGN KEY (receiver_id) REFERENCES users(id)
          );
          `);
});


// Register routes on fastify
const devRoute = (await import('./routes/devroute.js')).default;
fastify.register(devRoute, { db });

const chatRoute = (await import('./routes/chatroute.js')).default;
fastify.register(chatRoute, { db });

const authRoute = (await import('./routes/authroute.js')).default;
fastify.register(authRoute, { db });

// Create raw HTTP server from fastify's internal handler
const httpServer = fastify.server;

// Setup Socket.IO server on top of the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('⚡ Socket.IO client connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log('📩 Received message:', msg);
    const { content, sender_id, receiver_id } = msg;
    db.run(`INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`, [sender_id, receiver_id, content], function (err) {
      if (err) {
        console.error('Error inserting message:', err.message);
        return;
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket.IO client disconnected:', socket.id);
  });
});
await fastify.ready();
const PORT = 4000;
httpServer.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});