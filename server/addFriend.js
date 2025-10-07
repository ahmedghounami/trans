export function handleAddFriend(db, userId, friendId) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get(`SELECT id FROM users WHERE id = ?`, [friendId], (err, user) => {
        if (err) return reject(err);
        if (!user) return reject(new Error("User not found"));
 
        db.get(
          `SELECT * FROM friends WHERE user_id = ? AND friend_id = ?`,
          [userId, friendId],
          (err, existing) => {
            if (err) return reject(err);
            if (existing) return reject(new Error("Already friends or pending"));

            db.run(
              `INSERT INTO friends (user_id, friend_id, is_request) VALUES (?, ?, 1)`,
              [userId, friendId],
              function (err) {
                if (err) return reject(err);
                resolve({ message: "Friend request sent!" });
              }
            );
          }
        );
      });
    });
  });
}
