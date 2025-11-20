import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default async function ProfileRoutes(fastify, opts) {
    const db = opts.db;
    const io = opts.io;
    fastify.post('/profile', async (request, reply) => {
        const { userid, name, email, language, picture, currentPassword, newPassword } = request.body;

        // Authorize: verify JWT and ensure the requester matches the userid being updated
        let token = request.headers.authorization?.split(' ')[1];
        if (!token && request.cookies) token = request.cookies.token;
        if (!token) {
            return reply.status(401).send({ error: 'Unauthorized' });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET);
        } catch (err) {
            console.error('JWT verification failed for profile update:', err);
            return reply.status(401).send({ error: 'Unauthorized' });
        }
        if (!decoded || String(decoded.userId || decoded.id) !== String(userid)) {
            console.warn('Forbidden profile update attempt', { tokenUser: decoded, targetUser: userid });
            return reply.status(403).send({ error: 'Forbidden' });
        }

        console.log("📥 Received profile update request:", { userid, name, email, language, picture, hasPassword: !!newPassword });

        return new Promise((resolve, reject) => {
            // Build the SQL query dynamically based on what fields are provided
            let updateFields = [];
            let updateValues = [];

            if (name) {
                updateFields.push('name = ?');
                updateValues.push(name);
            }
            if (email) {
                updateFields.push('email = ?');
                updateValues.push(email);
            }
            // Skip language - column doesn't exist in database
            // if (language) {
            //     updateFields.push('language = ?');
            //     updateValues.push(language);
            // }
            if (picture) {
                updateFields.push('picture = ?');
                updateValues.push(picture);
            }

            // Handle password update if provided
            if (newPassword && currentPassword) {
                // First verify current password
                db.get('SELECT password FROM users WHERE id = ?', [userid], async (err, row) => {
                    if (err) {
                        console.error("Database error:", err.message);
                        reply.status(500).send({ error: "Database error" });
                        return reject(err);
                    }
                    
                    if (!row) {
                        reply.status(404).send({ error: "User not found" });
                        return reject(new Error("User not found"));
                    }

                    // Compare the hashed password with bcrypt
                    const passwordMatch = await bcrypt.compare(currentPassword, row.password);
                    if (!passwordMatch) {
                        console.log("❌ Password verification failed");
                        reply.status(401).send({ error: "Current password is incorrect" });
                        return reject(new Error("Invalid password"));
                    }

                    console.log("✅ Password verified successfully");
                    
                    // Hash the new password before storing
                    const hashedNewPassword = await bcrypt.hash(newPassword, 8);
                    updateFields.push('password = ?');
                    updateValues.push(hashedNewPassword);
                    
                    // Perform the update
                    performUpdate();
                });
            } else {
                // No password change, just update other fields
                performUpdate();
            }

            function performUpdate() {
                if (updateFields.length === 0) {
                    reply.status(400).send({ error: "No fields to update" });
                    return reject(new Error("No fields to update"));
                }

                updateValues.push(userid);
                const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;

                console.log("🔍 Executing SQL:", query);
                console.log("🔍 With values:", updateValues);

                db.run(query, updateValues, function (err) {
                    if (err) {
                        console.error("❌ Update profile error:", err.message);
                        reply.status(500).send({ error: "Database error", details: err.message });
                        return reject(err);
                    }
                    console.log("✅ Profile updated successfully. Rows affected:", this.changes);
                    // After update, fetch the updated user row and return it
                    db.get('SELECT id, name, email, picture, gold FROM users WHERE id = ?', [userid], (err2, row) => {
                        if (err2) {
                            console.error('❌ Error fetching updated user:', err2.message);
                            reply.status(500).send({ error: 'Database error', details: err2.message });
                            return reject(err2);
                        }
                            // Broadcast update via Socket.IO (server-side) so all clients receive authoritative update
                            try {
                                if (io && row && row.id) {
                                    const payload = { userId: row.id, name: row.name, picture: row.picture };
                                    io.emit('user_profile_updated', payload);
                                    io.to(`user:${row.id}`).emit('user_profile_updated', payload);
                                    fastify.log && fastify.log.info && fastify.log.info('📣 Broadcasted user_profile_updated', payload);
                                }
                            } catch (e) {
                                console.error('Error broadcasting profile update:', e);
                            }

                            // Reply with the updated user object
                            resolve(row);
                    });
                });
            }
        });
    });
}