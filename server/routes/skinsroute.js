/** @format */

export default  function skinsRoutes(fastify, opts) {
	const db = opts.db;
	// await db.run(`DROP TABLE skins;`)
	 db.run(`
    INSERT OR IGNORE INTO skins (name, type, price, color, img) VALUES
    ('Pastel Blue', 'ball'   , 0, '#ff7300', '#ff7300'),
    ('Pastel Blue', 'table'  , 0, '#ff7380', '/table1.png'),
    ('Pastel Blue', 'paddle' , 0, '#388E3C', '#388E3C'),
    ('Pastel Blue', 'table'  , 0, '#d181b0', '#d181b0'),
    ('Pastel Blue', 'paddle' , 0, '#a73276', '#a73276'),
    ('Pastel Blue', 'ball'   , 0, '#ff0095', '#ff0095'),
    ('Pastel Blue', 'paddle' , 0, '#7c7c7c', '#7c7c7c'),
    ('Pastel Blue', 'ball'   , 0, '#5e5e5e', '#5e5e5e'),
    ('Pastel Blue', 'table'  , 0, '#a7c7cb', '#a7c7cb'),
    ('Pastel Blue', 'paddle' , 0, '#658b91', '#658b91'),
    ('Pastel Blue', 'ball'   , 0, '#0093a7', '#0093a7'),
    ('Pastel Blue', 'table'  , 0, '#74c578', '#74c578'),
    ('Pastel Blue', 'ball'   , 0, '#007406', '#007406'),
    ('Pastel Blue', 'table'  , 0, '#252525', '#252525'),
    ('Pastel Blue', 'paddle' , 0, '#ffffff', '#ffffff')
    `);
	 
	fastify.get("/player_skins", async (request, reply) => {
		return new Promise((resolve, reject) => {
			const { player_id } = request.query;
			if (!player_id) {
				reply.status(400).send({ error: "Missing player_id in query" });
				return reject(new Error("Missing player_id in query"));
			}
			db.all(
				`SELECT *  FROM player_skins
                    JOIN skins ON player_skins.skin_id = skins.id
                  WHERE player_id = ?;`,
				[player_id],
				(err, rows) => {
					if (err) {
						reply.status(500).send({ error: "Database error" });
						return reject(err);
					}
					console.log(rows);
					
					resolve(rows);
				}
			);
		});
	});
	fastify.get("/selected_skins", async (request, reply) => {
		return new Promise((resolve, reject) => {
			const { player_id } = request.query;
			if (!player_id) {
				reply.status(400).send({ error: "Missing player_id in query" });
				return reject(new Error("Missing player_id in query"));
			}

			db.all(
				`SELECT player_skins.*, skins.* 
       FROM player_skins
       JOIN skins ON player_skins.skin_id = skins.id
       WHERE player_id = ? AND selected = 1;`,
				[player_id],
				(err, rows) => {
					if (err) {
						reply.status(500).send({ error: "Database error" });
						return reject(err);
					}

					// ✅ Must have exactly 3 selected skins
					if (!rows || rows.length !== 3) {
						reply
							.status(400)
							.send({ error: "Player must have exactly 3 selected skins" });
						return reject(new Error("Invalid skin count"));
					}

					// ✅ Check that we have 1 of each type
					const requiredTypes = ["table", "paddle", "ball"];
					const types = rows.map((r) => r.type);

					for (const type of requiredTypes) {
						if (!types.includes(type)) {
							reply
								.status(400)
								.send({ error: `Missing required skin type: ${type}` });
							return reject(new Error(`Missing skin type: ${type}`));
						}
					}

					// ✅ Sort rows in order: table → paddle → ball
					const order = { table: 1, paddle: 2, ball: 3 };
					rows.sort((a, b) => order[a.type] - order[b.type]);

					resolve(rows);
				}
			);
		});
	});

	fastify.post("/select_skin", async (request, reply) => {
		console.log("POST");

		return new Promise((resolve, reject) => {
			const { player_id, oldskin, newskin } = request.query;
			if (!player_id || !oldskin || !newskin) {
				reply.status(400).send({ error: "Missing player_id in query" });
				return reject(new Error("Missing player_id in query"));
			}
			db.all(
				`SELECT player_skins.* , skins.type
             FROM player_skins
             JOIN skins ON player_skins.skin_id = skins.id
             WHERE player_id = ?
               AND (skin_id = ? OR skin_id = ?)`,
				[player_id, oldskin, newskin],
				(err, rows) => {
					if (err) {
						reply.status(500).send({ error: "Database error" });
						return reject(err);
					} else if (rows.length != 2 || rows[0].type != rows[1].type) {
						reply.status(500).send({ error: "Database error" });
						return reject(new Error("diferent skin type"));
					} else {
						db.run(
							`UPDATE player_skins
                       SET selected = 0
                       WHERE player_id = ? AND skin_id = ?`,
							[player_id, oldskin],
							function (err) {
								if (err) {
									console.error("Error updating row:", err);
								}
							}
						);
						db.run(
							`UPDATE player_skins
                       SET selected = 1
                       WHERE player_id = ? AND skin_id = ?`,
							[player_id, newskin],
							function (err) {
								if (err) {
									console.error("Error updating row:", err);
								}
							}
						);
					}

					resolve(rows);
				}
			);
		});
	});
	// db.serialize(() => {
	// 	// db.run("DELETE FROM skins");
	// 	// Paddles
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle1", "paddle", 90, "/paddle.webp"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle2", "paddle", 110, "/blue-precision-paddle.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle3", "paddle", 135, "/futuristic-quantum-paddle.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle4", "paddle", 140, "/purple-magical-paddle.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle5", "paddle", 150, "/red-speed-ping-pong-paddle-flames.png"]);

	// 	// Tables
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table1", "table", 500, "/table1.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table2", "table", 500, "/table2.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table3", "table", 500, "/table3.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table4", "table", 500, "/table4.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table5", "table", 700, "/luxury-diamond-ping-pong.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table6", "table", 600, "/neon-purple-ping-pong.png"]);

	// 	// Balls
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["ball1", "ball", 50, "/ball.webp"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["ball2", "ball", 60, "/ball-2-blue-metallic.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["ball3", "ball", 70, "/ball-3-green-textured.png"]);
	// 	db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["ball4", "ball", 70, "/ball-6-yellow-star.png"]);
	// });
}
