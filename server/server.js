// server.mjs or server.js with "type": "module"

import Fastify from 'fastify';
import cors from '@fastify/cors';
import sqlite3 from 'sqlite3';

// Create server
const fastify = Fastify();

await fastify.register(cors, {
  origin: 'http://localhost:3000', // your Next.js frontend origin
  credentials: true, // Allow cookies to be sent
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

const devRoute = (await import('./routes/devroute.js')).default;
fastify.register(devRoute, { db });

const chatRoute = (await import('./routes/chatroute.js')).default;
fastify.register(chatRoute, { db });

const authRoute = (await import('./routes/authroute.js')).default;
fastify.register(authRoute, { db });



// Start server
try {
  await fastify.listen({ port: 4000 });
  console.log('Server running on http://localhost:4000');
} catch (err) {
  console.error(err);
  process.exit(1);
}
