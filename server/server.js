// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify();
import cors from '@fastify/cors';
await fastify.register(cors, {
    origin: 'http://localhost:3000',  // ✅ frontend origin
    credentials: true,                // ✅ allow cookies (important)
  });
  
// import sqlite3 and create a database table 
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('sqlite.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Could not connect to database', err)
    } else {
        console.log('Connected to the in-memory SQLite database.')
    }
})

// Create a table
db.serialize(() => {
    //    create a users table and conversations table and each user can have multiple conversations and each conversation can have multiple messages 
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    picture TEXT
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

// insert a user into the users table
fastify.post('/users', async (request, reply) => {
    const { name } = request.body;
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO  users (name) VALUES (?)`, [name], function (err) {
            if (err) {
                console.error('Error inserting user', err);
                reply.status(500).send({ error: 'Database error' });
                reject(err);
            } else {
                resolve({ id: this.lastID, name });
            }
        }
        );
    })
});

// get all users from the users table
fastify.get('/users', async (request, reply) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
            if (err) {
                console.error('Error fetching users', err);
                reply.status(500).send({ error: 'Database error' });
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

// insert a message into the messages table
fastify.post('/messages', async (request, reply) => {
    const { sender_id, receiver_id, content } = request.body;
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`, [sender_id, receiver_id, content], function (err) {
            if (err) {
                console.error('Error inserting message', err);
                reply.status(500).send({ error: 'Database error' });
                reject(err);
            } else {
                resolve({ id: this.lastID, sender_id, receiver_id, content });
            }
        });
    });
});

// get all messages from the messages table
fastify.get('/messages', async (request, reply) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM messages`, [], (err, rows) => {
            if (err) {
                console.error('Error fetching messages', err);
                reply.status(500).send({ error: 'Database error' });
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});
// get all messages between two users
fastify.get('/messages/:sender_id/:receiver_id', async (request, reply) => {
    const { sender_id, receiver_id } = request.params;
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)`, [sender_id, receiver_id, receiver_id, sender_id], (err, rows) => {
            if (err) {
                console.error('Error fetching messages', err);
                reply.status(500).send({ error: 'Database error' });
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

try {
    await fastify.listen({ port: 4000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}
