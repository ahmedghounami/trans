/** @format */

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import SkinContainer from "../components/SkinContainer";
import { Homecontext } from "./layout";
import GamesCard from "../components/gamescard";

const HomeContext = createContext({});
export default function Games() {
	// const [GameType, setGameType] = useState("localvsbot")
	// const [skinType, setSkinType] = useState('table');
	// const [selected, setselected] = useState({})
	const { skins, selected, setSkins, setselected } = Homecontext();
	const router = useRouter();
	const [GameType, setGameType] = useState("localvsbot");
	const [skinType, setSkinType] = useState("table");
	// useEffect(()=>{
	//     setSkins(data)
	// },[skinType])

	return (
		<div
			className="flex flex-col 
               h-full
               w-full
                p-4  gap-4  ">
			{/* <button
				onClick={() => {
					router.push("/games/game?gametype=online&oppid=2");
				}}>
				test1
			</button>
			<button
				onClick={() => {
					router.push("/games/game?gametype=online&oppid=1");
				}}>
				test2
			</button> */}
			{/* <div className="flex-1 min-h-64 flex gap-4">
				<div className=" relative   overflow-hidden rounded-2xl flex-4/6">
					<Image
						fill
						className=" object-cover  object-center"
						src={`/${GameType}.webp`}
						alt="profile"></Image>
					<div className="absolute  h-1/6  bottom-0 left-0  right-0">
						<div className="bg-black/40 rounded-b-2xl flex justify-evenly absolute w-full z-20 h-full  backdrop-blur-sm">
							<div className="bg-gray-300/50 flex items-center justify-center self-center  h-3/4 aspect-square rounded-full"></div>
							<button
								onClick={() => {
									GameType == "tournament"
										? router.push("/games/tournament")
										: router.push("/games/game?gametype=" + GameType);
								}}
								className="bg-blue-400 cursor-pointer flex items-center justify-center  h-full aspect-square rounded-full -translate-y-1/2">
								<Image
									className=" h-3/4 w-fit "
									src="/game-controller.svg"
									width={60}
									height={40}
									alt="profile"></Image>
							</button>
							<div className="bg-gray-300/50 flex items-center justify-center self-center  h-3/4 aspect-square rounded-full"></div>
						</div>
						<div className="bg-black/40   absolute top-0 left-1/2 -translate-x-1/2   backdrop-blur-sm h-2/3 aspect-[2/1] rounded-t-full transform -translate-y-[calc(100%-1px)]"></div>
					</div>
				</div>
				<div className="bg-amber-200 flex-2/6 "> </div>
			</div> */}
			<div
				className=" flex-1 min-h-80 py-2 px-4  md:w-[calc(100vw-125px)] max-md:w-[clac(100vw-40px)]  overflow-x-scroll  
            flex 
           [&::-webkit-scrollbar-thumb]:bg-blue-400
           [&::-webkit-scrollbar-thumb]:rounded-full
           [&::-webkit-scrollbar]:h-2">
				<div className=" flex gap-[2%] px-[2%] mx-auto ">
					<GamesCard
						type={"localvsbot"}
						title={"Play vs Bot"}
						description={"Practice against the computer"}
						setGameType={setGameType}
						GameType={GameType}></GamesCard>
					<GamesCard
						type={"local"}
						title={"2 Players"}
						description={"Play on the same device"}
						setGameType={setGameType}
						GameType={GameType}></GamesCard>
					<GamesCard
						type={"online"}
						title={"Online Match"}
						description={"Play with players around the world"}
						setGameType={setGameType}
						GameType={GameType}></GamesCard>
					<GamesCard
						type={"tournament"}
						title={"tournament"}
						description={"Battle players in knockout challenges"}
						setGameType={setGameType}
						GameType={GameType}></GamesCard>
				</div>
			</div>
			<div className="flex gap-4 flex-col flex-1">
				<div className="flex justify-center flex-none w-3/5 self-center relative">
					<label
						className={`w-1/3 flex justify-center aspect-[4/1] text-[clamp(20px,2.5vh,3vh)] items-center cursor-pointer transition-all duration-300 ${
							skinType == "table" ? "text-blue-500" : "text-white"
						}`}>
						<input
							className="hidden"
							type="radio"
							name="skin"
							onChange={() => setSkinType("table")}
							value="table"
							defaultChecked
						/>
						table
					</label>
					<label
						className={`w-1/3 flex justify-center aspect-[4/1] text-[clamp(20px,2.5vh,3vh)] items-center cursor-pointer transition-all duration-300 ${
							skinType == "ball" ? "text-blue-500" : "text-white"
						}`}>
						<input
							className="hidden"
							type="radio"
							name="skin"
							onChange={() => setSkinType("ball")}
							value="ball"
						/>
						ball
					</label>
					<label
						className={`w-1/3 flex justify-center aspect-[4/1] text-[clamp(20px,2.5vh,3vh)] items-center cursor-pointer transition-all duration-300 ${
							skinType == "paddle" ? "text-blue-500" : "text-white"
						}`}>
						<input
							className="hidden"
							type="radio"
							name="skin"
							onChange={() => setSkinType("paddle")}
							value="paddle"
						/>
						paddle
					</label>
					<div
						className={`absolute h-[clamp(8px,1vh,2vh)] w-full top-full rounded-full bg-amber-50`}>
						<div
							className={`absolute transition-all duration-300 h-full w-1/3 ${
								skinType == "table"
									? "left-0"
									: skinType == "ball"
									? "left-1/3"
									: "left-2/3"
							} bottom-0 rounded-full bg-blue-500`}></div>
					</div>
				</div>
				<div className="flex-1 flex min-h-56 ">
					<SkinContainer
						skinType={skinType}
						skins={skins}
						selected={selected}
						setselected={setselected}></SkinContainer>
				</div>
			</div>
		</div>
	);
}
