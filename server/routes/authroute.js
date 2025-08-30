

import jwt from 'jsonwebtoken';

const SECRET = 'your_jwt_secret';


function sign(id) {
    return jwt.sign({ userId: id }, SECRET, { expiresIn: '7d' });
}

export default async function authRoutes(fastify, opts) {
    
    const db = opts.db;
    

    // Login route
    fastify.post('/api/login', async (req, reply) => {
        const { name } = req.body;
        if (!name) return reply.status(400).send({ error: 'Name is required' });

        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE name = ?`, [name], (err, row) => {
                if (err) {
                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }

                if (row) {
                    const token = sign(row.id.toString());
                    console.log('Generated token:', token);
                    reply.send({
                        success: true,
                        token,
                        user: {
                            id: row.id,
                            name: row.name,
                            picture: row.picture
                        },
                    });
                    resolve(row);
                }
                else {
                    reply.status(404).send({ error: 'User not found' });
                }
            });
        });
    });

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
                    // console.log('User data:', row)
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
            console.error('JWT verification error:', err);
            reply.status(401).send({ error: 'Unauthorized' });
        }
    });

}