import bcrypt from 'bcryptjs';

export default async function ProfileRoutes(fastify, opts) {
    const db = opts.db;
    fastify.post('/profile', async (request, reply) => {
        const { userid, name, email, language, picture, currentPassword, newPassword } = request.body;
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
                    resolve({ message: "Profile updated successfully" });
                });
            }
        });
    });
}