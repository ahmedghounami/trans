/** @format */

"use client";
import { useState } from "react";
import SkinContainer from "../components/SkinContainer";
import { Homecontext } from "./layout";
import GamesCard from "../components/gamescard";

export default function Games() {
	const { skins, selected, setselected } = Homecontext();
	const [GameType, setGameType] = useState<string>("localvsbot");
	const [skinType, setSkinType] = useState<"table" | "ball" | "paddle">(
		"table"
	);
	return (
		<div
			className="flex flex-col 
               h-full
               w-full
                p-4  gap-4  ">
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
