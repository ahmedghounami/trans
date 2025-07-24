export default async function gameRoutes(fastify, opts) {
    const db = opts.db;

    // Get all games
    fastify.get('/games', async (req, reply) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM games`, [], (err, rows) => {
                if (err) {
                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }
                resolve(rows);
            });
        });
    });

    fastify.post('/games/:player1_id/:player2_id', async (req, reply) => {
        const player1_id = req.params.player1_id;
        const player2_id = req.params.player2_id;

        if (!player1_id || !player2_id) {
            reply.status(400).send({ error: 'Player IDs are required' });
            return;
        }

        const date = new Date().toISOString();
        const { player1_score, player2_score, player1_gold_earned, player2_gold_earned, winner_id } = req.body;
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO games (date, player1_id, player2_id, player1_score, player2_score, player1_gold_earned, player2_gold_earned, winner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [date, player1_id, player2_id, player1_score, player2_score, player1_gold_earned, player2_gold_earned, winner_id],
                function (err) {
                    if (err) {
                        reply.status(500).send({ error: 'Database error' });
                        return reject(err);
                    }
                    resolve({ id: this.lastID });
                });
        });
    });

    // get all games for a specific user by user id from qury

    fastify.get('/games/:userId', async (req, reply) => {
        const userId = req.params.userId;

        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM games WHERE player1_id = ? OR player2_id = ?`, [userId, userId], (err, rows) => {
                if (err) {
                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }
                resolve(rows);
            });
        });
    });
}
// gameRoutes.js (ES Module)
