/** @format */

"use client";
import LocalTournamentSetings from "@/app/components/LocalTournamentSetings";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Homecontext } from "../games/layout";

function win(id, name, finals, setfinals) {
	const res = Math.floor(id / 10) + 1;
	const winerid = res + "" + Math.floor(((id % 10) + 1) / 2);
	// console.log("win", winerid);

	setfinals(
		[...finals, { name: name, id: winerid }].sort((a, b) => a.id - b.id)
	);
}

function Tournamentbracket({
	player,
	setplayers,
	finals,
	setfinals,
	players,
	size,
	playerbox,
	settournamentplayers,
}) {
	const router = useRouter();
	const [play, setplay] = useState(true);
	const items = [];
	let box = playerbox;
	let index = player.index;
	let length = size;
	useEffect(() => {
		let s = size;
		let newfinals = finals;
		let index = 1;

		while (s % 2 != 0 && s > 1 && players.length % 2 == 1) {
			// console.log(s);
			const existingplayer = finals?.find(
				(p) => p?.id == players[players.length - 1]?.id
			);
			if (!existingplayer) {
				newfinals = [
					...newfinals,
					{
						name: players[players.length - 1].name,
						id: index + "" + Math.floor((s + 1) / 2),
					},
				];
				s = Math.floor((s + 1) / 2);
				index *= 2;
			}
			newfinals.sort((a, b) => a.id - b.id);
			setfinals(newfinals);
		}
	}, [players]);
	useEffect(() => {
		let playstate = true;
		if (index == 2 && box % 2 != 1 && box <= players.length) {
			const nextbox = count + "" + Math.floor((box + 1) / 2);
			// console.log("here", nextbox);

			if (finals.find((f) => f.id == nextbox)) playstate = false;
		}
		if (index > 2 && box <= size) {
			const nextbox = count + "" + Math.floor((box + 1) / 2);
			const p1 = finals.find((f) => f.id == count - 1 + "" + (box - 1));
			const p2 = finals.find((f) => f.id == count - 1 + "" + box);

			if (finals.find((f) => f.id == nextbox) || !p1 || !p2) playstate = false;
		}
		setplay(playstate);
	}, [finals]);
	let count = 0;
	let number = index * 2;
	while (number % 2 == 0 && number > 0) {
		count++;
		number /= 2;
	}
	if (count == Math.floor((players.length + 1) / 2) && players.length > 1) {
		const winer = finals.find((p) => p.id == count + "1");
		// console.log(winer);

		if (winer) {
			// console.log("win");
			setTimeout(() => {
				router.push("/games");
				setfinals([]);
				setplayers([]);
			}, 500);
		}
	}
	if (box % 2 != 0 && box != size) return <></>;
	if (box > 1) {
		const p = finals.find(
			(p) => p.id == count + "" + Math.floor((box + 1) / 2)
		);
		items.push(
			<div
				key={index}
				className={`absolute   border   translate-y-px ${
					box % 2 != 0 ? " top-1/2   " : "bottom-1/2"
				}   right-0 translate-x-full border-l-0  w-1/2`}
				style={{
					height: `calc((100% + 19px) * ${index})`,
				}}>
				{play && box % 2 == 0 ? (
					<button
						onClick={() => {
							if (index == 2 && box % 2 != 1 && box <= players.length) {
								const nextbox = count + "" + Math.floor((box + 1) / 2);
								// setTimeout(() => {

								settournamentplayers({
									p1: players[box - 1].name,
									p1_id: box,
									p2: players[box - 2].name,
									p2_id: box - 1,
									winer: 0,
									gamestatus: 1,
								});

								// router.push(
								// 	`/games/game?gametype=tournament&p1=${
								// 		players[box - 1].name
								// 	}&p1id=${box}&p2=${players[box - 2].name}&p2id=${box - 1}`
								// );
								// }, 100);
							}
							if (index > 2 && box <= size) {
								const nextbox = count + "" + Math.floor((box + 1) / 2);
								const p1 = finals.find(
									(f) => f.id == count - 1 + "" + (box - 1)
								);
								const p2 = finals.find((f) => f.id == count - 1 + "" + box);

								if (finals.find((f) => f.id == nextbox) || !p1 || !p2) return;
								// setTimeout(() => {
								settournamentplayers({
									p1: p1.name,
									p1_id: p1.id,
									p2: p2.name,
									p2_id: p2.id,
									winer: 0,
									gamestatus: 1,
								});
								// router.push(
								// 	`/games/game?gametype=tournament&p1=${p1.name}&p1id=${p1.id}&p2=${p2.name}&p2id=${p2.id}`
								// );
								// }, 100);
							}
						}}
						className="absolute -translate-1/2 top-1/2 left-1/2 ">
						<Image
							className=" h-3/4 w-fit "
							src="/game-controller.svg"
							width={60}
							height={40}
							alt="profile"></Image>
					</button>
				) : (
					<></>
				)}
				<div className={` absolute  flex   top-1/2 right-0 translate-x-full `}>
					<div className="border-t w-4 h-1 "> </div>
					<div className="border -translate-y-1/2 px-4 py-2 w-32 h-10">
						{p ? p.name : ""}
						<div className=" hidden">
							{(index *= 2)}
							{box % 2 == 1 ? box++ : (box += 0)}
							{length % 2 == 1 ? length++ : (length += 0)}
						</div>
						<Tournamentbracket
							setplayers={setplayers}
							settournamentplayers={settournamentplayers}
							finals={finals}
							setfinals={setfinals}
							players={players}
							size={length / 2}
							playerbox={box / 2}
							player={{ index: index, id: player.id }}></Tournamentbracket>
					</div>
				</div>
			</div>
		);
	}

	return <>{items}</>;
}

function Localtournament({
	players,
	started,
	size,
	finals,
	setfinals,
	setplayers,
	settournamentplayers,
}) {
	const [name, setname] = useState("");
	const [message, setMessage] = useState("");
	
	// Function to shuffle players array
	const shufflePlayers = (playerList) => {
		const shuffled = [...playerList];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	// Check if player count is valid for tournament
	const validPlayerCounts = [2, 4, 8];
	const canStartTournament = validPlayerCounts.includes(players.length);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		addPlayer();
	};

	// Add player function
	const addPlayer = () => {
		// Check if maximum players reached
		if (players.length == 8) {
			setMessage("Maximum 8 players allowed for tournament");
			return;
		}
		
		// Check if player already exists
		const existingPlayer = players.find(
			(p) => p.name.toLowerCase() == name.toLowerCase()
		);
		if (existingPlayer) {
			setMessage("Player name already exists");
			return;
		}
		
		// Add new player and shuffle
		if (name != "") {
			const newPlayers = [
				...players,
				{ name: name, index: 1, id: players.length + 1 },
			];
			const shuffledPlayers = shufflePlayers(newPlayers);
			setplayers(shuffledPlayers);
			setname("");
			setMessage(""); // Clear message on successful add
		}
		setfinals([]);
	};

	return (
		<div className="w-full mx-4 flex flex-col gap-4 ">
			{started ? (
				<></>
			) : (
				<>
					<div className="flex gap-4">
						<form onSubmit={handleSubmit} className="border rounded-md flex">
							<input
								type="text"
								value={name}
								placeholder="add new player"
								onChange={(e) => {
									if (e.target.value.length <= 10) {
										setname(e.target.value.trim());
										setMessage(""); // Clear message when typing
									}
								}}
								className={`focus:outline-0 px-2 h-full py-2`}
							/>
							<button
								type="submit"
								className="py-2 px-4 border-l cursor-pointer">
								+
							</button>
						</form>
					</div>
					
					{/* Show message if exists */}
					{message && (
						<div className="text-red-500 font-medium">
							{message}
						</div>
					)}
					
					{/* Show message about valid player counts */}
					{players.length > 0 && !canStartTournament && (
						<div className="text-red-500 font-medium">
							Tournament requires exactly 2, 4, or 8 players (currently: {players.length})
						</div>
					)}
					
					{canStartTournament && (
						<div className="text-green-500 font-medium">
							Ready to start tournament! Click on game controllers to begin matches.
						</div>
					)}
				</>
			)}
			
			{/* Only show bracket if player count is valid */}
			{canStartTournament ? (
				<div className="flex flex-col gap-4 w-fit">
					{players.map((player, index) => {
						return (
							<div
								className="border relative px-4 py-2 w-32 h-10"
								key={index}>
								{player.name}
								<Tournamentbracket
									setplayers={setplayers}
									setfinals={setfinals}
									finals={finals}
									players={players}
									size={size}
									playerbox={index + 1}
									settournamentplayers={settournamentplayers}
									player={player}></Tournamentbracket>
							</div>
						);
					})}
				</div>
			) : (
				players.length > 0 && (
					<div className="text-gray-500 italic">
						Add more players to make 2, 4, or 8 total players
					</div>
				)
			)}
		</div>
	);
}

export default function Tournament({
	tournamentplayers,
	settournamentplayers,
}) {
	const router = useRouter();

	const { selected } = Homecontext();
	const [finals, setfinals] = useState(() => {
		const saved = sessionStorage.getItem("finals");
		return saved ? JSON.parse(saved) : [];
	});
	const [players, setplayers] = useState(() => {
		const saved = sessionStorage.getItem("players");
		return saved ? JSON.parse(saved) : [];
	});
	useEffect(() => {
		sessionStorage.setItem("players", JSON.stringify(players));
		if (players.length == 0) setstarted(false);
	}, [players]);
	useEffect(() => {
		sessionStorage.setItem("finals", JSON.stringify(finals));
	}, [finals]);
	useEffect(() => {
		if (!selected.types || !selected.types[0]) {
			router.push("/games");
		}
	});

	const [started, setstarted] = useState(() => {
		const saved = sessionStorage.getItem("started");
		return saved ? JSON.parse(saved) : false;
	});
	useEffect(() => {
		sessionStorage.setItem("started", JSON.stringify(started));
	}, [started]);

	const serchParams = useSearchParams();

	const winer =
		tournamentplayers.winer == 1 ? tournamentplayers.p1 : tournamentplayers.p2;

	const id =
		tournamentplayers.winer == 1
			? tournamentplayers.p1_id
			: tournamentplayers.p2_id;
	useEffect(() => {
		if (winer && id) {
			setstarted(true);
			win(id, winer, finals, setfinals);
			// router.push("/games/tournament");
		}
	}, []);
	return (
		<div className="bg-gray-400/30 backdrop-blur-sm flex justify-center items-center z-50 absolute top-0 bottom-0 left-0 right-0">
			<div className="h-screen w-screen p-10 overflow-auto">
				<div className="flex gap-4 mb-8">
					<button
						onClick={() => {
							router.push("/games");
						}}
						className="bg-gray-600 cursor-pointer px-4 py-2 rounded-sm">
						Go Back
					</button>
					<button
						onClick={() => {
							setfinals([]);
							setplayers([]);
							setstarted(false);
							settournamentplayers({});
							router.push("/games");
						}}
						className="bg-red-700 cursor-pointer px-4 py-2 rounded-sm">
						Exit Tournament
					</button>
				</div>
				<Localtournament
					settournamentplayers={settournamentplayers}
					started={started}
					finals={finals}
					setfinals={setfinals}
					players={players}
					size={players.length}
					setplayers={setplayers}
				/>
			</div>
		</div>
	);
}