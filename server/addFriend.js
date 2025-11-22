export function handleAddFriend(db, userId, friendId) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Check if target user exists
      db.get(`SELECT id FROM users WHERE id = ?`, [friendId], (err, user) => {
        if (err) return reject(err);
        if (!user) return reject(new Error("User not found"));

        // 2. Check if this user already sent friend request
        db.get(
          `SELECT * FROM friends 
           WHERE user_id = ? AND friend_id = ?`,
          [friendId, userId],
          (err, reverseRequest) => {
            if (err) return reject(err);

            // 🔥 CASE 1 — Mutual request -> AUTO ACCEPT
            if (reverseRequest && reverseRequest.is_request === 1) {
              db.run(
                `UPDATE friends SET is_request = 0 
                 WHERE user_id = ? AND friend_id = ?`,
                [friendId, userId],
                (err2) => {
                  if (err2) return reject(err2);
                  resolve({ autoAccepted: true, message: "Friend request auto-accepted!" });
                }
              );
              return;
            }

            // 3. Check if we already sent a request or already friends
            db.get(
              `SELECT * FROM friends 
               WHERE user_id = ? AND friend_id = ?`,
              [userId, friendId],
              (err3, existing) => {
                if (err3) return reject(err3);

                if (existing)
                  return reject(new Error("Already friends or pending"));

                // 🔥 CASE 2 — Normal friend request
                db.run(
                  `INSERT INTO friends (user_id, friend_id, is_request) 
                   VALUES (?, ?, 1)`,
                  [userId, friendId],
                  function (err4) {
                    if (err4) return reject(err4);
                    resolve({ autoAccepted: false, message: "Friend request sent!" });
                  }
                );
              }
            );
          }
        );
      });
    });
  });
}
