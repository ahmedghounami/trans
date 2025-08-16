export function handleBuy(db, userId, itemId, itemPrice) {
	return new Promise((resolve, reject) => {
		itemPrice = Number(itemPrice);
		if (isNaN(itemPrice) || itemPrice <= 0)
			return reject(new Error("Invalid item price"));
		db.serialize(() => {
			db.get(`SELECT gold FROM users WHERE id = ?`, [userId], (err, user) => {
				if (err)
					return reject(err);
				if (!user)
					return reject(new Error("User not found"));
				if (user.gold < itemPrice)
					return reject(new Error("Not enough gold"));
				db.get(`SELECT id FROM skins WHERE id = ?`, [itemId], (err, item) => {
					if (err)
						return reject(err);
					if (!item)
						return reject(new Error("Item not found"));
					db.get( `SELECT * FROM player_skins WHERE player_id = ? AND skin_id = ?`, [userId, itemId], (err, owned) => {
						if (err)
							return reject(err);
						if (owned)
							return reject(new Error("You already own this item"));
						db.run( `UPDATE users SET gold = gold - ? WHERE id = ?`, [itemPrice, userId], function (err) {
							if (err)
								return reject(err);
							if (this.changes === 0)
								return reject(new Error("Failed to update user gold"));
							db.run( `INSERT INTO player_skins (player_id, skin_id, selected) VALUES (?, ?, 0)`, [userId, itemId], function (err) {
								if (err)
									return reject(err);
								resolve({
									message: `You bought item #${itemId} for ${itemPrice} gold!`,
								});
							});
						});
					});
				});
			});
		});
	});
}
