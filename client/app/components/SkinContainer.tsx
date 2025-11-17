/** @format */

"use client";
import Image from "next/image";
import { Homecontext } from "../home/layout";
import { useEffect, useState } from "react";
let table;
let ball;
let paddle;
export default function SkinContainer({
	skinType,
	skins,
	selected,
	setselected,
}) {
	// useEffect(()=>{
	//     setSkins(data)
	// const {skins} = Homecontext();

	useEffect(() => {
		table = skins.find((item) => item.type == "table" && item.selected);
		ball = skins.find((item) => item.type == "ball" && item.selected);
		paddle = skins.find((item) => item.type == "paddle" && item.selected);
	}, [skins]);
	useEffect(() => {
		if (skins) {
			const alltypes = ["table", "paddle", "ball"];
			const typeindex = alltypes.indexOf(skinType);
			if (!selected.types || !selected.types[0])
				setselected({ types: [table, paddle, ball], type: typeindex });
			else setselected({ ...selected, type: typeindex });
		}
	}, [skinType, skins]);
	function changeselected(skin) {
		console.log("new skin :", skin);
		console.log("old skin :", selected.types[selected.type]);
		async function postselect() {
			const response = await fetch(
				"http://localhost:4000/select_skin?player_id=" +
					skin.player_id +
					"&oldskin=" +
					selected.types[selected.type].skin_id +
					"&newskin=" +
					skin.skin_id,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({}),
				}
			);
			const data = await response.json();
			console.log(data);
		}
		postselect();
		const newtypes = selected.types;
		if (skinType == "table") newtypes[0] = skin;
		if (skinType == "ball") newtypes[2] = skin;
		if (skinType == "paddle") newtypes[1] = skin;
		setselected({ ...selected, types: newtypes });
	}
	if (!selected.types || !selected.types[0]) return <></>;
	return (
		<div
			className="px-4 py-2  md:w-[calc(100vw-125px)] max-md:w-[clac(100vw-40px)]    overflow-y-hidden overflow-x-scroll 
                flex 
               [&::-webkit-scrollbar-thumb]:bg-blue-400
               [&::-webkit-scrollbar-thumb]:rounded-full
               [&::-webkit-scrollbar]:h-2">
			<div className=" flex gap-[5%] px-[5%] items-center mx-auto ">
				{skins.map((skin, index) =>
					skin.type == skinType ? (
						<div
							key={index}
							onClick={() => {
								changeselected(skin);
							}}
							style={{
								background: `${
									skinType == "table"
										? skin.color
										: selected.types[0].color
								}`,
							}}
							className={`relative group    cursor-pointer flex  
                  h-4/5  aspect-[9/5]    
                  shadow-md
                  transition hover:scale-105 
                  `}>
							{/* {skinType == "table" && skin.img[0] != "#" ? (
								<Image
									fill
									className=" object-cover object-center"
									src={skin.img}
									alt="profile"></Image>
							) : (
								<></>
							)}
							{skinType != "table" && selected.types[0].img[0] != "#" ? (
								<Image
									fill
									className=" object-cover object-center"
									src={selected.types[0].img}
									alt="profile"></Image>
							) : (
								<></>
							)} */}
							<div className=" absolute border left-1/2 border-dashed h-full "></div>
							<div
								id="paddle1"
								style={{
									background: `${
										skinType == "paddle"
											? skin.color
											: selected.types[1].color
									}`,
								}}
								className={`h-1/3 top-1/4 -translate-y-1/2  aspect-[1/6] rounded-full 
                    absolute left-1`}>
								{/* {skinType == "paddle" && skin.img[0] != "#" ? (
									<Image
										fill
										className=" object-cover object-center"
										src={skin.img}
										alt="profile"></Image>
								) : (
									<></>
								)}
								{skinType != "paddle" && selected.types[1].img[0] != "#" ? (
									<Image
										fill
										className=" object-cover object-center"
										src={selected.types[1].img}
										alt="profile"></Image>
								) : (
									<></>
								)} */}
							</div>
							<div
								id="paddle2"
								style={{
									background: `${
										skinType == "paddle"
											? skin.color
											: selected.types[1].color
									}`,
								}}
								className={`h-1/3 top-1/2 -translate-y-1/2 aspect-[1/6]
                     rounded-full absolute right-1`}>
								{/* {skinType == "paddle" && skin.img[0] != "#" ? (
									<Image
										fill
										className=" object-cover object-center"
										src={skin.img}
										alt="profile"></Image>
								) : (
									<></>
								)}
								{skinType != "paddle" && selected.types[1].img[0] != "#" ? (
									<Image
										fill
										className=" object-cover object-center"
										src={selected.types[1].img}
										alt="profile"></Image>
								) : (
									<></>
								)} */}
							</div>
							<div
								id="ball"
								style={{
									background: `${
										skinType == "ball"
											? skin.color
											: selected.types[2].color
									}`,
								}}
								className={` top-1/3 left-3/5 h-[10%]
                    ${
											skinType == "ball"
												? skin.color
												: selected.types[2].color
										}
                    -translate-1/2 aspect-square   rounded-full absolute`}>
								{/* {skinType == "ball" && skin.img[0] != "#" ? (
									<Image
										fill
										className=" object-cover object-center"
										src={skin.img}
										alt="profile"></Image>
								) : (
									<></>
								)}
								{skinType != "ball" && selected.types[2].img[0] != "#" ? (
									<Image
										fill
										className=" object-cover object-center"
										src={selected.types[2].img}
										alt="profile"></Image>
								) : (
									<></>
								)} */}
							</div>
							<div className="absolute  h-full w-full ">
								<div
									className={`absolute top-0 w-1/6 aspect-square  border-t-[clamp(2px,0.4vh,5vh)] border-l-[clamp(2px,0.4vh,5vh)] -translate-[clamp(2px,1vh,5vh)]  ${
										selected.types[selected.type].skin_id == skin.skin_id
											? "border-blue-500"
											: "border-gray-500"
									} group-hover:border-blue-500 transition-all duration-300 `}></div>
								<div
									className={`absolute bottom-0 w-1/6 aspect-square  border-b-[clamp(2px,0.4vh,5vh)] border-l-[clamp(2px,0.4vh,5vh)]  -translate-x-[clamp(2px,1vh,5vh)] translate-y-[clamp(2px,1vh,5vh)]  ${
										selected.types[selected.type].skin_id == skin.skin_id
											? "border-blue-500"
											: "border-gray-500"
									} group-hover:border-blue-500 transition-all duration-300 `}></div>
								<div
									className={`absolute top-0 right-0 w-1/6 aspect-square  border-t-[clamp(2px,0.4vh,5vh)] border-r-[clamp(2px,0.4vh,5vh)]  translate-x-[clamp(2px,1vh,5vh)] -translate-y-[clamp(2px,1vh,5vh)]  ${
										selected.types[selected.type].skin_id == skin.skin_id
											? "border-blue-500"
											: "border-gray-500"
									} group-hover:border-blue-500 transition-all duration-300 `}></div>
								<div
									className={`absolute bottom-0 right-0 w-1/6 aspect-square  border-b-[clamp(2px,0.4vh,5vh)] border-r-[clamp(2px,0.4vh,5vh)]  translate-x-[clamp(2px,1vh,5vh)] translate-y-[clamp(2px,1vh,5vh)]  ${
										selected.types[selected.type].skin_id == skin.skin_id
											? "border-blue-500"
											: "border-gray-500"
									} group-hover:border-blue-500 transition-all duration-300 `}></div>
							</div>
						</div>
					) : (
						""
					)
				)}
			</div>
		</div>
	);
}
