/** @format */

// Import the GameAPI and gameResults from your existing game module
import { sessionsmap } from "../game.js";
import { randomUUID } from "crypto";

const gameApiRoute = async (fastify, options) => {
	const { db } = options;

	// === GAME INITIALIZATION ===

	// Start a new game session
	fastify.post("/api/games/start", async (request, reply) => {
		try {
			const { player_id, player2_name, player_name, player_img, game_type, sessionId } =
				request.body;

			if (
				!player_id ||
				!player_name ||
				!player_img ||
				!game_type ||
				!sessionId
			) {
				return reply.status(400).send({
					success: false,
					error: "missing data",
				});
			}
			const ingame = Array.from(sessionsmap.values()).some(
				(player) =>
					player.players_info.p1_id == player_id ||
					player.players_info.p2_id == player_id
			);
			if (ingame) {
				// sessionsmap.clear();

				return reply.status(409).send({
					success: false,
					error: "player already exists",
				});
			}
			if (game_type == "online") {
				const onlineSession = Array.from(sessionsmap.entries()).find(
					([sessionId, session]) =>
						session.gametype == "online" && session.players_info.p2_id == 0
				);
				if (onlineSession) {
					const [sessionId, session] = onlineSession;
					session.players_info.p2_id = player_id;
					session.players_info.p2_name = player_name;
					session.players_info.p2_img = player_img;
					session.p2_ready = true;
					console.log("player 2", sessionsmap);

					return reply.status(201).send({
						success: true,
						message: "player added successfully",
						sessionId: sessionId,
					});
				}
			}

			sessionsmap.set(sessionId, {
				players_info: {
					p1_id: player_id,
					p2_id: 0,
					p1_name: player_name,
					p1_img: player_img,
					p2_name: player2_name ? player2_name: "player 2",
					p2_img: player_img,
				},
				p1_ready: true,
				p2_ready: false,
				gametype: game_type,
				startgame: false,
				positions: {},
			});
			return reply.status(201).send({
				success: true,
				message: "player added successfully",
				sessionId: sessionId,
			});
		} catch (error) {
			console.error("Error starting game:", error);
			return reply.status(500).send({
				success: false,
				error: "Failed to start game",
			});
		}
	});
};

export default gameApiRoute;
