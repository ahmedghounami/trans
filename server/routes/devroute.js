// devroute.js (ES Module)

export default async function userRoutes(fastify, opts) {
    const db = opts.db;
  
    fastify.get('/users', async (req, reply) => {
      return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, [], (err, rows) => {
          if (err) {
            reply.status(500).send({ error: 'Database error' });
            return reject(err);
          }
          resolve(rows);
        });
      });
    });
  
    fastify.get('/users/:id', async (req, reply) => {
      const userId = req.params.id;
  
      return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) => {
          if (err) {
            reply.status(500).send({ error: 'Database error' });
            return reject(err);
          }
          if (!row) {
            reply.status(404).send({ error: 'User not found' });
            return resolve(null);
          }
          resolve(row);
        });
      });
    });
    // Add more routes if needed
  }
  