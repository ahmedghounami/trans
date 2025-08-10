export default async function skinsRoutes(fastify, opts) {
 const db = opts.db
 await db.run(`
    INSERT OR IGNORE INTO skins (name, type, price, img) VALUES
    ('Pastel Blue', 'ball', 0, '#ff7300'),
    ('Pastel Blue', 'table', 0, '#b8b8b8'),
    ('Pastel Blue', 'paddle', 0, '#388E3C'),
    ('Pastel Blue', 'table', 0, '#d181b0'),
    ('Pastel Blue', 'paddle', 0, '#a73276'),
    ('Pastel Blue', 'ball', 0, '#ff0095'),
    ('Pastel Blue', 'paddle', 0, '#7c7c7c'),
    ('Pastel Blue', 'ball', 0, '#5e5e5e'),
    ('Pastel Blue', 'table', 0, '#a7c7cb'),
    ('Pastel Blue', 'paddle', 0, '#658b91'),
    ('Pastel Blue', 'ball', 0, '#0093a7'),
    ('Pastel Blue', 'table', 0, '#74c578'),
    ('Pastel Blue', 'ball', 0, '#007406'),
    ('Pastel Blue', 'table', 0, '#252525'),
    ('Pastel Blue', 'paddle', 0, '#fff')
    `);
    // await db.run(`DROP TABLE skins;`)
    await db.run(`INSERT OR IGNORE INTO player_skins (player_id, skin_id, selected)
    SELECT id, 1, 1 FROM users
    WHERE id NOT IN (
        SELECT player_id FROM player_skins WHERE skin_id = 1
    );`);
    await db.run(`INSERT OR IGNORE INTO player_skins (player_id, skin_id, selected)
    SELECT id, 2, 1 FROM users
    WHERE id NOT IN (
        SELECT player_id FROM player_skins WHERE skin_id = 2
    );`);
    await db.run(`INSERT OR IGNORE INTO player_skins (player_id, skin_id, selected)
    SELECT id, 3, 1 FROM users
    WHERE id NOT IN (
        SELECT player_id FROM player_skins WHERE skin_id = 3
    );`);
    await db.run(`INSERT OR IGNORE INTO player_skins (player_id, skin_id)
    SELECT id, 4 FROM users
    WHERE id NOT IN (
        SELECT player_id FROM player_skins WHERE skin_id = 4
    );`);
    await db.run(`INSERT OR IGNORE INTO player_skins (player_id, skin_id)
    SELECT id, 5 FROM users
    WHERE id NOT IN (
        SELECT player_id FROM player_skins WHERE skin_id = 5
    );`);
    await db.run(`INSERT OR IGNORE INTO player_skins (player_id, skin_id)
    SELECT id, 6 FROM users
    WHERE id NOT IN (
        SELECT player_id FROM player_skins WHERE skin_id = 6
    );`);
    fastify.get('/player_skins', async (request, reply) => {
         return new Promise((resolve, reject) => {
            const {player_id} = request.query
            if (!player_id)
            {
                reply.status(400).send({ error: 'Missing player_id in query' });
                return reject(new Error('Missing player_id in query'));
            }
            db.all(`SELECT * , skins.* FROM player_skins
                    JOIN skins ON player_skins.skin_id = skins.id
                  WHERE player_id = ?;`, [player_id], (err, rows) => {
                if (err) {
                    reply.status(500).send({ error: 'Database error' });
                    return reject(err);
                }
                resolve(rows);
            });
        });
    } )
    
}