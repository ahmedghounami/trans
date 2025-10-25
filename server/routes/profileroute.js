export default async function ProfileRoutes(fastify, opts) {
    const db = opts.db;
    fastify.post('/profile', async (request, reply) => {
        const { picture, userid } = request.body;
        console.log("Received profile update request:", picture, userid);
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET picture = ? WHERE id = ?`,
                [picture, userid],
                function (err) {
                    if (err) {
                        console.error("Update profile error:", err.message);
                        reply.status(500).send({ error: "Database error" });
                        return reject(err);
                    }
                    resolve({ message: "Profile updated successfully" });
                }
            );

        }
        );
    }
    );
}