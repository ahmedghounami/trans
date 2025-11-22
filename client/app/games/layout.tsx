/** @format */

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";

type SkinType = "table" | "paddle" | "ball";
type Skin = {
	skin_id: number;
	type: SkinType;
	color: string;
	img: string;
	selected?: boolean;
	player_id: number;
};

type Selected = {
	types: Skin[];
	type: number; // 0: table, 1: paddle, 2: ball
};

type MinimalUser = {
	id: number;
	name?: string;
	picture?: string;
} | null;

type HomeContextType = {
	skins: Skin[];
	user: MinimalUser;
	selected: Selected;
	setSkins: React.Dispatch<React.SetStateAction<Skin[]>>;
	setselected: React.Dispatch<React.SetStateAction<Selected>>;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);
export default function Games({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [selected, setselected] = useState<Selected>({ types: [], type: 0 });
	const [skins, setSkins] = useState<Skin[]>([]);
	const { user } = useUser() as { user: MinimalUser; loading: boolean };
	// console.log(user);
	useEffect(() => {
		if (user) {
			async function fetchOwnedSkins() {
				try {
					const res = await fetch(
						"http://localhost:4000/player_skins?player_id=" + user!.id
					);
					if (!res.ok) {
						throw new Error("Failed to fetch player skins");
					}
					const data = await res.json();
					setSkins(data as Skin[]);
				} catch (error) {
					console.error("Error fetching owned skins data:", error);
				}
			}
			fetchOwnedSkins();
		}
	}, [user]);

	return (
		<HomeContext.Provider
			value={{ skins, user, selected, setSkins, setselected }}>
			{children}
		</HomeContext.Provider>
	);
}
export function Homecontext(): HomeContextType {
	const context = useContext(HomeContext);
	if (!context) {
		throw new Error("Homecontext must be used within Games layout");
	}
	return context;
}
