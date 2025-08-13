// server/buyFunction.js
export function buyFunction(db, userId, itemName, itemPrice) {
	return new Promise((resolve, reject) => {
	  db.serialize(() => {
		// 1️⃣ Get user gold
		db.get("SELECT gold FROM users WHERE id = ?", [userId], (err, user) => {
		  if (err) return reject(err);
		  if (!user) return reject(new Error("User not found"));
		  if (user.gold < itemPrice) return reject(new Error("Not enough gold"));

		  // 2️⃣ Get the skin ID and type
		  db.get("SELECT id FROM skins WHERE name = ?", [itemName], (err, skin) => {
			if (err) return reject(err);
			if (!skin) return reject(new Error("Skin not found"));

			const skinId = skin.id;

			// 3️⃣ Check if user already owns the skin
			db.get(
			  "SELECT * FROM player_skins WHERE player_id = ? AND skin_id = ?",
			  [userId, skinId],
			  (err, existing) => {
				if (err) return reject(err);
				if (existing) return reject(new Error("Already owns this skin"));

				// 4️⃣ Begin transaction
				db.run("BEGIN TRANSACTION", (err) => {
				  if (err) return reject(err);

				  // Deduct gold
				  db.run(
					"UPDATE users SET gold = gold - ? WHERE id = ?",
					[itemPrice, userId],
					function (err) {
					  if (err) {
						db.run("ROLLBACK");
						return reject(err);
					  }

					  if (this.changes === 0) {
						db.run("ROLLBACK");
						return reject(new Error("Failed to deduct gold"));
					  }

					  // Add skin to player_skins
					  db.run(
						"INSERT INTO player_skins (player_id, skin_id, selected) VALUES (?, ?, 0)",
						[userId, skinId],
						function (err) {
						  if (err) {
							db.run("ROLLBACK");
							return reject(err);
						  }

						  // Commit transaction
						  db.run("COMMIT", (err) => {
							if (err) return reject(err);
							resolve({ message: `Successfully bought ${itemName}` });
						  });
						}
					  );
					}
				  );
				});
			  }
			);
		  });
		});
	  });
	});
  }
