export default async function skinsRoutes(fastify, opts) {
	const db = opts.db
	db.serialize(() => {

		db.run("DELETE FROM skins");
		// Paddles
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle1", "paddles", 90, "/paddle.webp"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle2", "paddles", 110, "/blue-precision-paddle.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle3", "paddles", 135, "/futuristic-quantum-paddle.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle4", "paddles", 140, "/purple-magical-paddle.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["paddle5", "paddles", 150, "/red-speed-ping-pong-paddle-flames.png"]);

		// Tables
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table1", "tables", 500, "/table1.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table2", "tables", 500, "/table2.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table3", "tables", 500, "/table3.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table4", "tables", 500, "/table4.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table5", "tables", 700, "/luxury-diamond-ping-pong.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["table6", "tables", 600, "/neon-purple-ping-pong.png"]);

		// Balls
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["ball1", "balls", 50, "/ball.webp"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["ball2", "balls", 60, "/ball-2-blue-metallic.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["ball3", "balls", 70, "/ball-3-green-textured.png"]);
		db.run("INSERT OR IGNORE INTO skins (name, type, price, img) VALUES (?, ?, ?, ?)", ["ball4", "balls", 70, "/ball-6-yellow-star.png"]);
	});
}
