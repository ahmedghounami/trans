export default async function shopRoute(fastify, opts) {
	const db = opts.db;

	fastify.get("/paddles", (request, reply) => {
		const db = opts.db;
		db.all("SELECT * FROM skins WHERE type = ?", ["paddle"], (err, rows) => {
			if
				(err) reply.code(500).send({ error: "Database error" });
			else
				reply.send(rows);
		});
	});
	fastify.get("/balls", (request, reply) => {
		const db = opts.db;
		db.all("SELECT * FROM skins WHERE type = ?", ["ball"], (err, rows) => {
			if
				(err) reply.code(500).send({ error: "Database error" });
			else
				reply.send(rows);
		});
	});
		fastify.get("/tables", (request, reply) => {
		const db = opts.db;
		db.all("SELECT * FROM skins WHERE type = ?", ["table"], (err, rows) => {
			if (err)
				reply.code(500).send({ error: "Database error" });
			else
				reply.send(rows);
		});
	});
}
