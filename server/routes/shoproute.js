export default async function shopRoute(fastify, opts) {
	const db = opts.db;

	fastify.get("/api/paddles", (request, reply) => {
		const db = opts.db;
		db.all("SELECT * FROM skins WHERE type = ?", ["paddle"], (err, rows) => {
			if
				(err) reply.code(500).send({ error: "Database error" });
			else
				reply.send(rows);
		});
	});
	fastify.get("/api/balls", (request, reply) => {
		const db = opts.db;
		db.all("SELECT * FROM skins WHERE type = ?", ["ball"], (err, rows) => {
			if
				(err) reply.code(500).send({ error: "Database error" });
			else
				reply.send(rows);
		});
	});
		fastify.get("/api/tables", (request, reply) => {
		const db = opts.db;
		db.all("SELECT * FROM skins WHERE type = ?", ["table"], (err, rows) => {
			if (err)
				reply.code(500).send({ error: "Database error" });
			else
				reply.send(rows);
		});
	});
}
