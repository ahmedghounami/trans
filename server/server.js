

// import Fastify from 'fastify';
// import { WebSocketServer } from 'ws';

// const fastify = Fastify();
// const PORT = 3001;

// // Start Fastify server
// fastify.listen({ port: PORT }, (err, address) => {
//   if (err) throw err;
//   console.log(`🚀 Server running at ${address}`);

//   // Start WebSocket server on the same port
//   const wss = new WebSocketServer({ server: fastify.server });

//   wss.on('connection', function connection(ws) {
//     console.log('🔌 Client connected');

//     ws.on('message', function message(data) {
//       console.log('📩 Received:', data.toString());

//       // Reply back
//       ws.send(`👋 Hello from Fastify WebSocket! You said: ${data}`);
//     });

//     ws.send('🎉 Welcome to the WebSocket server!');
//   });
// });



// -----------------------------------------------// 


// server.mjs or server.js with "type": "module"

import Fastify from 'fastify';
import cors from '@fastify/cors';
import sqlite3 from 'sqlite3';
import { WebSocketServer } from 'ws';
// Create server
import game from './game.js'
const fastify = Fastify();

await fastify.register(cors, {
  origin: 'http://localhost:3000', // your Next.js frontend origin
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
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
  const clients = new Set(); //
  const wss = new WebSocketServer({ server: fastify.server });

  wss.on('connection', function connection(ws) {
    console.log('🔌 Client connected');

    ws.on('message', function message(data) {
      // add the message to the database
      // const data = data.toString();
      const { content, sender_id, receiver_id } = JSON.parse(data.toString());
      console.log('📩 Received:', content, 'semderid: ', sender_id, 'receiverid: ', receiver_id);
      db.run(`INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`, [sender_id, receiver_id, content], function (err) {
        if (err) {
          console.error('Error inserting message:', err.message);
          return;
        }
        const newMessage = {
          type: 'new_message',
          id: this.lastID, // ID of the inserted row
          sender_id,
          receiver_id,
          content,
          created_at: new Date().toISOString(),
        };

        const json = JSON.stringify(newMessage);

        // ✅ Broadcast to all connected clients
        clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(json);
          }
        });
      });

      // Reply back
      ws.send(JSON.stringify({
        type: 'echo',
        message: `👋 Hello from Fastify WebSocket! You said: ${data}`,
      }));
    });

    ws.send(JSON.stringify({
      type: 'welcome',
      message: '🎉 Welcome to the WebSocket server!',
    }));
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
