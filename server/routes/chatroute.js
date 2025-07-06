export default async function chatRoutes(fastify, opts) {
    const db = opts.db;


    fastify.post('/users', async (req, reply) => {
        const { name, picture } = req.body;
        if (!name || !picture) return reply.status(400).send({ error: 'Name and picture are required' });

        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO users (name, picture) VALUES (?, ?)`, [name, picture], function (err) {
                if (err) {
                    console.error('Insert user error:', err.message);
                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }
                resolve({ id: this.lastID, name });
            });
        });
    });


    // Insert message
    fastify.post('/messages', async (req, reply) => {
        const { sender_id, receiver_id, content } = req.body;
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`, [sender_id, receiver_id, content], function (err) {
                if (err) {
                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }
                resolve({ id: this.lastID, sender_id, receiver_id, content });
            });
        });
    });

    // Get all messages
    fastify.get('/messages', async (req, reply) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM messages`, [], (err, rows) => {
                if (err) {
                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }
                resolve(rows);
            });
        });
    });

    // Get messages between two users
    fastify.get('/messages/:sender_id/:receiver_id', async (req, reply) => {
        const { sender_id, receiver_id } = req.params;
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)`,
                [sender_id, receiver_id, receiver_id, sender_id],
                (err, rows) => {
                    if (err) {
                        reply.status(500).send({ error: 'Database error' });
                        return reject(err);
                    }
                    resolve(rows);
                }
            );
        });
    });

}