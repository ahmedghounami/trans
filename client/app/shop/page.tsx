"use client";
import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import Tables from "./Tables";
import Balls from "./Balls";
import Paddles from "./Paddles";

// function Button

export default function Shop() {
	const { user, loading } = useUser();
	const [category, setCategory] = useState<"table" | "ball" | "paddle">("table");

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen text-white">
				Loading...
			</div>
		);
	}
	if (!user) {
		return (
			<div className="flex items-center justify-center h-screen text-white">
				Failed to load user.
			</div>
		);
	}

	return (
		<div className="flex gap-4 flex-col flex-1 md:space-y-4">
		<div className="flex justify-center flex-none w-3/5 self-center relative">
			{["table", "ball", "paddle"].map((type, idx) => (
			<button
				key={type}
				onClick={() => setCategory(type as "table" | "ball" | "paddle")}
				className={`w-1/3 flex justify-center items-center h-14 cursor-pointer transition-all duration-300 font-semibold ${
				category === type ? "text-blue-500" : "text-white"
				}`}
			>
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</button>
			))}

			{/* Sliding indicator */}
			<div className="absolute h-2 w-full bottom-0 rounded-full bg-amber-50">
			<div
				className={`absolute transition-all duration-300 h-2 w-1/3 bottom-0 rounded-full bg-blue-500 ${
				category === "table"
					? "left-0"
					: category === "ball"
					? "left-1/3"
					: "left-2/3"
				}`}
			></div>
			</div>
		</div>

		{/* Category Content */}
		{category === "table" && <Tables currentUser={user} />}
		{category === "ball" && <Balls currentUser={user} />}
		{category === "paddle" && <Paddles currentUser={user} />}
		</div>

	);
}
