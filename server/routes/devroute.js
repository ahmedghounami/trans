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
  
    // Add more routes if needed
  }
  