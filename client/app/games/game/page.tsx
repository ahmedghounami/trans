/** @format */

"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/app/components/loading";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import { Homecontext } from "../layout";
import { io } from "socket.io-client";
import { randomUUID } from "crypto";

export default function Game() {
	const { selected, setselected } = Homecontext();
	const { me } = Homecontext();
	const router = useRouter();
	const [Positions, setPositions] = useState({});
	const [playersdata, setplayersdata] = useState({p1_name:"Player 1", p1_img:"", p2_name:"Player 1", p2_img:""});
	const serchParams = useSearchParams();
	let gametype = serchParams.get("gametype");
	let oppid = Number(serchParams.get("oppid"));

	let tournament = false;
	if (!oppid) oppid = 0;

	useEffect(() => {
		if (!me) return;
		async function newgame() {
			try {
				const sessionid = crypto.randomUUID();
				const response = await fetch("http://localhost:4000/api/games/start", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						player_id: me.id,
						player_name: me.name,
						player_img: me.picture,
						game_type: gametype,
						sessionId: sessionid,
					}),
				});
				const res = await response.json();
				if (response.ok) {
					console.log( res); // "player added successfully"
					sessionStorage.setItem("gameSessionId", sessionid);
					const socket = io("http://localhost:4000/game", {
						auth: {
							sessionId: res.sessionId,
							playerId: me.id,
						},
					});

					socket.on("gameState", (data) => {
						console.log(data);
						setplayersdata(data.players_info)
						setPositions({...data.positions, Curentplayer:data.Curentplayer});
					});
					function handleKeyDown(event) {
						const key = event.key;
						if (
							key === "w" ||
							key === "s" ||
							key === "ArrowUp" ||
							key === "ArrowDown"
						) {
							socket.emit("keydown", { key: key });
						}
					}

					function handleKeyUp(event) {
						const key = event.key;
						if (
							key === "w" ||
							key === "s" ||
							key === "ArrowUp" ||
							key === "ArrowDown"
						) {
							socket.emit("keyup", { key: key });
						}
					}

					document.addEventListener("keydown", handleKeyDown);
					document.addEventListener("keyup", handleKeyUp);
				} else {
					// router.push("/games")
					console.log(res.error); // "missing data" or "player already exists"
				}
			} catch (error) {
				console.log(error);
			}
		}
		newgame();
		// name picture
		console.log(me);
		// const oppdata = {}
		// // Connect to Socket.IO game namespace
		// const socket = io('http://localhost:4000/game', {
		// 	query: {
		// 		gametype: gametype,
		// 		oppid: oppid
		// 	}
		// });

		// // Socket event listeners
		// socket.on('connect', () => {
		// 	console.log('Connected to game server');
		// 	// Join the game after connection is established
		// 	socket.emit('joinGame', {
		// 		gametype: gametype,
		// 		oppid: oppid,
		// 		id: me.id
		// 	});
		// });

		// socket.on('welcome', (data) => {
		// 	console.log(data.message);
		// });

		// socket.on('gameState', (data) => {
		// 	setPositions(data);
		// });
		// socket.on('oppid', (data)=>{
		// 	console.log(data);

		// 	oppdata

		// })

		// socket.on('exit', (data) => {
		// 	console.log('Game exit:', data);
		// 	router.push("/games");
		// });

		// socket.on('opponentDisconnected', () => {
		// 	console.log('Opponent disconnected');
		// 	// Handle opponent disconnection
		// 	router.push("/games");
		// });

		// socket.on('disconnect', () => {
		// 	console.log('Disconnected from game server');
		// });

		// socket.on('connect_error', (error) => {
		// 	console.error('Connection error:', error);
		// 	router.push("/games");
		// });

		// // Keyboard event handlers
		// function handleKeyDown(event) {
		// 	const key = event.key;
		// 	if (key === 'w' || key === 's' || key === 'ArrowUp' || key === 'ArrowDown') {
		// 		socket.emit('keydown', { key: key });
		// 	}
		// }

		// function handleKeyUp(event) {
		// 	const key = event.key;
		// 	if (key === 'w' || key === 's' || key === 'ArrowUp' || key === 'ArrowDown') {
		// 		socket.emit('keyup', { key: key });
		// 	}
		// }

		// document.addEventListener("keydown", handleKeyDown);
		// document.addEventListener("keyup", handleKeyUp);

		// // Cleanup function
		// return () => {
		// 	document.removeEventListener("keydown", handleKeyDown);
		// 	document.removeEventListener("keyup", handleKeyUp);
		// 	socket.disconnect();
		// };
	}, []);

	useEffect(() => {
		async function fetchSkin() {
			try {
				const res = await fetch(
					`http://localhost:4000/selected_skins?player_id=${me.id}`
				);
				const data = await res.json();
				// console.log(data);
				setselected({ types: data, type: 0 });
			} catch (err) {
				console.error("Error fetching skin:", err);
			}
		}
		if (me) {
			fetchSkin();
		}
	}, [me]);

	if (gametype == "tournament") {
		gametype = "local";
		tournament = true;
	}
	// console.log(selected);

	if (!Positions.score || !selected.types || !selected.types[0]) {
		return (
			<div className="bg-gray-400/30 backdrop-blur-sm flex flex-col justify-center items-center z-50  absolute top-0 bottom-0 left-0 right-0   ">
				<Loading />
			</div>
		);
	}

	if (Positions.win) {
		if (tournament) {
			setTimeout(() => {
				router.push(
					`/games/tournament?winer=${Positions.win == 1 ? p1 : p2}&id=${
						Positions.win == 1 ? p1id : p2id
					}`
				);
			}, 100);
			return ;
		}

		setTimeout(() => {
			router.push("/games");
		}, 500);

		return (
			<div className="bg-gray-400/30 backdrop-blur-sm flex flex-col justify-center items-center z-50  absolute top-0 bottom-0 left-0 right-0   ">
				{Positions.win == 1 ? (
					<Loader word={"Victory!"}></Loader>
				) : (
					<Loader word={"Defeat"}></Loader>
				)}
			</div>
		);
	}

	return (
		<div className="bg-gray-400/30 backdrop-blur-sm flex justify-center items-center z-50  absolute top-0 bottom-0 left-0 right-0   ">
			<div className="flex  flex-col gap-5 w-2/3">
				<div className="flex items-center justify-between px-5">
					<div className="flex items-center gap-5">
						<div className="rounded-full w-14 overflow-hidden h-14 border  ">
							<Image
								className="w-full h-full object-cover object-center "
								src={"/"+ (Positions.Curentplayer == 1?playersdata.p1_img :playersdata.p2_img) }
								width={60}
								height={60}
								alt="profile"></Image>
						</div>
						<p>{Positions.Curentplayer == 1?playersdata.p1_name:playersdata.p2_name}</p>
					</div>
					<div>{`${Positions.Curentplayer == 1? Positions.score?.p1 : Positions.score?.p2} - ${Positions.Curentplayer == 1? Positions.score?.p2 : Positions.score?.p1}`}</div>
					<div className="flex items-center gap-5">
						<p>{Positions.Curentplayer == 1?playersdata.p2_name:playersdata.p1_name}</p>
						<div className="rounded-full w-14 overflow-hidden h-14 border  ">
							<Image
								className="w-full h-full object-cover object-center "
								src={"/"+ (Positions.Curentplayer == 1?playersdata.p2_img :playersdata.p1_img) }
								width={60}
								height={60}
								alt="profile"></Image>
						</div>
					</div>
				</div>
				<div
					id="table"
					style={{
						background: selected.types[0].color,
					}}
					className={` relative ${
						Positions.Curentplayer == 2 && `transform -scale-x-100`
					}  bg-[#252525] flex justify-center  border-4 rounded-2xl w-full aspect-[9/5]`}>
					<div className=" border border-dashed h-full "></div>
					<div
						id="padle1"
						className={`h-1/5 -translate-y-1/2  aspect-[1/6] rounded-full bg-[#fff] absolute left-1`}
						style={{
							top: `${Positions.p1}%`,
							background: selected.types[1].color,
						}}></div>
					<div
						id="padle2"
						className="h-1/5 -translate-y-1/2 aspect-[1/6] rounded-full bg-green-700 absolute right-1"
						style={{
							top: `${Positions.p2}%`,
							background: selected.types[1].color,
						}}></div>
					<div
						id="ball"
						style={{
							top: `${Positions.bally}%`,
							left: `${Positions.ballx}%`,
							background: selected.types[2].color,
						}}
						className=" bg-[#c7c7c7] h-[4%] -translate-1/2 aspect-square   rounded-full absolute"></div>
				</div>
			</div>
		</div>
	);
}
