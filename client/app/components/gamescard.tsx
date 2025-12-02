/** @format */

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GamesCard({
	setGameType,
	title,
	description,
	GameType,
	type,
}) {
	console.log(GameType);
	const router = useRouter();

	return (
		<div className="h-full group ">
			<div
				onClick={() => {
					// if (type == "tournament") router.push("/games/tournament");
					router.push("/games/game?gametype=" + type);
					setGameType(type);
				}}
				className={`relative   overflow-hidden  cursor-pointer flex  h-full
                                    aspect-[3/4] bg-white border 
                                    rounded-2xl shadow-md   transition-all duration-700  group-hover:rotate-y-180
                                    hover:shadow-lg hover:border-blue-500`}>
				<Image
					fill
					className=" object-cover object-center"
					src={`/${type}.webp`}
					alt="profile"></Image>
				<div className="z-10 absolute  rounded-2xl top-3/4 bottom-0 transition-all duration-1000  group-hover:top-0 w-full flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs ">
					<h3
						className={` text-[clamp(20px,2.5vh,3vh)] group-hover:text-[clamp(24px,2.5vh,3vh)] transition-all duration-700 group-hover:rotate-y-180 group-hover:text-blue-500   font-semibold mb-1`}>
						{title}
					</h3>
					<p
						className={`text-[clamp(14px,1.5vh,3vh)] group-hover:text-[clamp(16px,2vh,3vh)] transition-all duration-700 group-hover:rotate-y-180 group-hover:text-blue-300  text-center`}>
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}
