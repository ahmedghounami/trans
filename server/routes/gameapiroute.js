/** @format */

// Import the GameAPI and gameResults from your existing game module
// import { log } from "console";
import { sessionsmap } from "../game.js";
import { randomUUID } from "crypto";

const gameApiRoute = async (fastify, options) => {
	const { db } = options;

	// === GAME INITIALIZATION ===

	// Start a new game session
	fastify.post("/api/games/start", async (request, reply) => {
		try {
			const {
				player_id,
				player2_id,
				invited_player,
				player2_name,
				player_name,
				player_img,
				game_type,
				sessionId,
			} = request.body;

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
					(player.players_info.p1_id == player_id && player.p1_ready) ||
					(player.players_info.p2_id == player_id && player.p2_ready)
			);
			if (ingame) {
				return reply.status(409).send({
					success: false,
					error: "player already exists in an active game",
				});
			}
			if (invited_player) {
				const invitedSession = Array.from(sessionsmap.entries()).find(
					([sessionId, session]) =>
						session.gametype == "online" &&
						session.players_info.p1_id == player2_id
				);
				if (invitedSession) {
					const [sessionId, session] = invitedSession;
					session.players_info.p2_id = player_id;
					session.players_info.p2_name = player_name;
					session.players_info.p2_img = player_img;
					session.p2_ready = true;
					// console.log("player 2", sessionsmap);
					return reply.status(201).send({
						success: true,
						message: "player added successfully",
						sessionId: sessionId,
					});
				}
			}
			if (game_type == "online" && !player2_id) {
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
					// console.log("player 2", sessionsmap);

					return reply.status(201).send({
						success: true,
						message: "player added successfully",
						sessionId: sessionId,
					});
				}
			}
			console.log("new session flow");

			sessionsmap.set(sessionId, {
				players_info: {
					p1_id: player_id,
					p2_id: player2_id ? player2_id : 0,
					p1_name: player_name,
					p1_img: player_img,
					p2_name: player2_name ? player2_name : "player 2",
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
	fastify.get("/api/games/active", async (request, reply) => {
		try {
			const activeSessions = Array.from(sessionsmap.entries()).map(
				([sessionId, session]) => ({
					sessionId,
					players: {
						player1: {
							id: session.players_info.p1_id,
							name: session.players_info.p1_name,
							ready: session.p1_ready,
						},
						player2: session.players_info.p2_id
							? {
									id: session.players_info.p2_id,
									name: session.players_info.p2_name,
									ready: session.p2_ready,
							  }
							: null,
					},
					gameType: session.gametype,
					status: session.startgame ? "active" : "waiting",
					score: session.positions?.score || { p1: 0, p2: 0 },
				})
			);

			return {
				success: true,
				count: activeSessions.length,
				sessions: activeSessions,
			};
		} catch (error) {
			console.error("Error fetching active games:", error);
			return reply.status(500).send({
				success: false,
				error: "Failed to fetch active games",
			});
		}
	});

	// Get specific game session details
	fastify.get("/api/games/:sessionId", async (request, reply) => {
		try {
			const { sessionId } = request.params;
			const session = sessionsmap.get(sessionId);

			if (!session) {
				return reply.status(404).send({
					success: false,
					error: "Game session not found",
				});
			}

			return {
				success: true,
				session: {
					sessionId,
					players: session.players_info,
					gameType: session.gametype,
					p1_ready: session.p1_ready,
					p2_ready: session.p2_ready,
					startgame: session.startgame,
					score: session.positions?.score || { p1: 0, p2: 0 },
					positions: session.positions,
				},
			};
		} catch (error) {
			console.error("Error fetching game session:", error);
			return reply.status(500).send({
				success: false,
				error: "Failed to fetch game session",
			});
		}
	});

	// End a game session
	fastify.post("/api/games/:sessionId/end", async (request, reply) => {
		try {
			const { sessionId } = request.params;
			const session = sessionsmap.get(sessionId);

			if (!session) {
				return reply.status(404).send({
					success: false,
					error: "Game session not found",
				});
			}

			// Clean up game session
			sessionsmap.delete(sessionId);

			return {
				success: true,
				message: "Game session ended successfully",
			};
		} catch (error) {
			console.error("Error ending game session:", error);
			return reply.status(500).send({
				success: false,
				error: "Failed to end game session",
			});
		}
	});
};

export default gameApiRoute;
