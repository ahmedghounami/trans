

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const SECRET = 'your_jwt_secret';


function sign(id) {
    return jwt.sign({ userId: id }, SECRET, { expiresIn: '7d' });
}

const SchemaRegister =
{
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
        name: { type: 'string' },
        // make the email unique in the database: 
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    },
}

export default async function authRoutes(fastify, opts) {

    const db = opts.db;

    fastify.post('/login', async (req, reply) => {
        const { email, password } = req.body;
        if (!email, !password) return reply.status(400).send({ error: 'Email and password are required' });
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {

                if (err) {
                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }
                if (row) {
                    const passwordMatch = bcrypt.compareSync(password, row.password);
                    if (!passwordMatch) {
                        return reply.status(401).send({ error: 'Invalid credentials' });
                    }
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

    fastify.get('/me', async (request, reply) => {
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
                            rps_wins: row.rps_wins,
                            rps_losses: row.rps_losses,
                            rps_draws: row.rps_draws,
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

    fastify.post("/users", SchemaRegister, async (req, reply) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return reply.status(400).send({ error: " Name, email and password are required" });
        const hashedPassword = await bcrypt.hash(password, 8);

        console.log("Request body:", req.body);
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT OR IGNORE INTO users (name, email, password) VALUES (?, ?, ?)`,
                [name, email, hashedPassword],
                function (err) {
                    if (err) {
                        console.error("Insert user error:", err.message);
                        reply.status(500).send({ error: "Database error" });
                        return reject(err);
                    }
                    resolve({ id: this.lastID, name, email, hashedPassword });
                }
            );
        });
    });

}