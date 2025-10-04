/** @format */

"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/app/components/loading";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import { Homecontext } from "../layout";

export default function Game() {
	const { selected } = Homecontext();
	const { me } = Homecontext();
	const router = useRouter();
	const [Positions, setPositions] = useState({});
	const serchParams = useSearchParams();
	let gametype = serchParams.get("gametype");
	let oppid = Number(serchParams.get("oppid"));
	const p1 = serchParams.get("p1");
	const p1id = serchParams.get("p1id");
	const p2 = serchParams.get("p2");
	const p2id = serchParams.get("p2id");
	let tournament = false;
	if(!oppid)
		oppid = 0;
	const opp = oppid != 0 ? "&oppid=" + oppid : "" 

	// console.log(gametype);

	//   console.log(me);
	useEffect(() => {
		if (!me) return;
		console.log(me);

		const socket = new WebSocket(`ws://localhost:9090?gametype=${gametype}${opp}`);
		socket.addEventListener("open", () => {
			socket.send(JSON.stringify({ type: "getpositions", id: me.id }));
		});
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.exit == 1) router.push("/games");
			setPositions(data);
		};
		function keydown(event: Event) {
			socket.send(JSON.stringify({ type: "keydown", key: event.key }));
		}
		function keyup(event: Event) {
			socket.send(JSON.stringify({ type: "keyup", key: event.key }));
		}

		document.addEventListener("keydown", keydown);
		document.addEventListener("keyup", keyup);
		//returned function in useefect works when rerunder or disconection
		//to clean events and socket
		return () => {
			document.removeEventListener("keydown", keydown);
			document.removeEventListener("keyup", keyup);

			if (
				socket.readyState === WebSocket.OPEN ||
				socket.readyState === WebSocket.CONNECTING
			) {
				socket.close();
			}
		};
	}, [me]);
	if (gametype == "tournament") {
		gametype = "local";
		tournament = true;
	}
	console.log(selected);

	if (!me || !selected.types || !selected.types[0]) {
		router.push("/games");
		return (
			<div className="bg-gray-400/30 backdrop-blur-sm flex flex-col justify-center items-center z-50  absolute top-0 bottom-0 left-0 right-0   ">
				<Loading />
			</div>
		);
	}
	if (!Positions.score || !selected.types || !selected.types[0]) {
		// console.log("loading");
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
					`/games/tournament?winer=${Positions.win == 1 ? p2 : p1}&id=${
						Positions.win == 1 ? p2id : p1id
					}`
				);
			}, 100);
			return <></>;
		}
		// p1 => -1
		// p2 => 1
		setTimeout(() => {
			router.push("/games");
		}, 500);
		// console.log("Victory");
		// console.log(Positions.win);

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
								src="/profile.jpg"
								width={60}
								height={60}
								alt="profile"></Image>
						</div>
						<p>{p2 ? p2 : "player 2"}</p>
					</div>
					<div>{`${Positions.score?.p2} - ${Positions.score?.p1}`}</div>
					<div className="flex items-center gap-5">
						<p>{p1 ? p1 : "player 1"}</p>
						<div className="rounded-full w-14 overflow-hidden h-14 border  ">
							<Image
								className="w-full h-full object-cover object-center "
								src="/profile.jpg"
								width={60}
								height={60}
								alt="profile"></Image>
						</div>
					</div>
				</div>
				{/* transform -scale-x-100 add this to table to mirror rotation */}
				<div
					id="table"
					style={{
						background:
							selected.types[0].img[0] == "#" ? selected.types[0].img : "",
					}}
					className={` relative ${
						Positions.host && `transform -scale-x-100`
					}  bg-[#252525] flex justify-center  border-4 rounded-2xl w-full aspect-[9/5]`}>
					{selected.types[0].img[0] != "#" ? (
						<Image
							fill
							className=" object-cover object-center"
							src={selected.types[0].img}
							alt="profile"></Image>
					) : (
						<></>
					)}
					<div className=" border border-dashed h-full "></div>
					<div
						id="padle1"
						className={`h-1/5 -translate-y-1/2  aspect-[1/6] rounded-full bg-[#fff] absolute left-1`}
						style={{
							top: `${Positions.p1}%`,
							background:
								selected.types[1].img[0] == "#" ? selected.types[1].img : "",
						}}>
						{selected.types[1].img[0] != "#" ? (
							<Image
								fill
								className=" object-cover object-center"
								src={selected.types[1].img}
								alt="profile"></Image>
						) : (
							<></>
						)}
					</div>
					<div
						id="padle2"
						className="h-1/5 -translate-y-1/2 aspect-[1/6] rounded-full bg-green-700 absolute right-1"
						style={{
							top: `${Positions.p2}%`,
							background:
								selected.types[1].img[0] == "#" ? selected.types[1].img : "",
						}}>
						{selected.types[1].img[0] != "#" ? (
							<Image
								fill
								className=" object-cover object-center"
								src={selected.types[1].img}
								alt="profile"></Image>
						) : (
							<></>
						)}
					</div>
					<div
						id="ball"
						style={{
							top: `${Positions.bally}%`,
							left: `${Positions.ballx}%`,
							background:
								selected.types[2].img[0] == "#" ? selected.types[2].img : "",
						}}
						className=" bg-[#c7c7c7] h-[4%] -translate-1/2 aspect-square   rounded-full absolute">
						{selected.types[2].img[0] != "#" ? (
							<Image
								fill
								className=" object-cover object-center"
								src={selected.types[2].img}
								alt="profile"></Image>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
