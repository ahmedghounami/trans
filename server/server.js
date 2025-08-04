import Fastify from 'fastify';
import cors from '@fastify/cors';
import sqlite3 from 'sqlite3';
import { Server } from 'socket.io';
import { sockethandler } from './socket.js';

import game from './game.js';

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
          gold INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          `);
  db.run(`
          CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          sender_id INTEGER NOT NULL,
          receiver_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          status BOOL DEFAULT false,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sender_id) REFERENCES users(id),
          FOREIGN KEY (receiver_id) REFERENCES users(id)
          );
          `);

  db.run(`
          CREATE TABLE IF NOT EXISTS games (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date DATETIME NOT NULL,
          player1_id INTEGER,
          player2_id INTEGER,
          player1_score INTEGER,
          player2_score INTEGER,
          player1_gold_earned INTEGER,
          player2_gold_earned INTEGER,
          winner_id INTEGER,
          FOREIGN KEY (player1_id) REFERENCES users(id),
          FOREIGN KEY (player2_id) REFERENCES users(id),
          FOREIGN KEY (winner_id) REFERENCES users(id)
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

const gameRoute = (await import('./routes/gameroute.js')).default;
fastify.register(gameRoute, { db });

// Create raw HTTP server from fastify's internal handler
const httpServer = fastify.server;

// Setup Socket.IO server on top of the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  }
});

sockethandler(io, db);

await fastify.ready();
const PORT = 4000;
httpServer.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
