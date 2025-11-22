import jwt from 'jsonwebtoken';

const SECRET = 'your_jwt_secret';

function sign(id) {
    return jwt.sign({ userId: id }, SECRET, { expiresIn: '7d' });
}

export default async function authRoutes(fastify, opts) {

    const db = opts.db;
    const logger = fastify.log;   // ✅ use fastify logger (writes to server.log!)

    // ===========================
    //        LOGIN ROUTE
    // ===========================
    fastify.post('/api/login', async (req, reply) => {
        const { name } = req.body;

        if (!name) {
            logger.info({
                event: "login",
                login_success: false,
                reason: "missing_name"
            });

            return reply.status(400).send({ error: 'Name is required' });
        }

        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE name = ?`, [name], (err, row) => {
                if (err) {
                    logger.info({
                        event: "login",
                        login_success: false,
                        reason: "db_error"
                    });

                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }

                if (row) {
                    // SUCCESS LOGIN 
                    const token = sign(row.id.toString());

                    logger.info({
                        event: "login",
                        login_success: true,
                        user_id: row.id,
                        username: row.name
                    });

                    reply.send({
                        success: true,
                        token,
                        user: {
                            id: row.id,
                            name: row.name,
                            picture: row.picture
                        },
                    });

                    return resolve(row);
                }

                // USER NOT FOUND
                logger.info({
                    event: "login",
                    login_success: false,
                    reason: "user_not_found",
                    attempted_name: name
                });

                reply.status(404).send({ error: 'User not found' });
            });
        });
    });

    // ===========================
    //        /api/me
    // ===========================
    fastify.get('/api/me', async (request, reply) => {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) return reply.status(401).send({ error: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, SECRET);

            return new Promise((resolve, reject) => {
                db.get(`SELECT * FROM users WHERE id = ?`, [decoded.userId], (err, row) => {
                    if (err) {
                        reply.status(500).send({ error: 'Database error' });
                        return reject(err);
                    }

                    if (row) {
                        reply.send({
                            id: row.id,
                            name: row.name,
                            picture: row.picture,
                            gold: row.gold,
                        });
                        resolve(row);
                    } else {
                        reply.status(404).send({ error: 'User not found' });
                    }
                });
            });

        } catch (err) {
            reply.status(401).send({ error: 'Unauthorized' });
        }
    });
}
