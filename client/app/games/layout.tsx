/** @format */

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import SkinContainer from "../components/SkinContainer";
import { useUser } from "../Context/UserContext";

const HomeContext = createContext({});
export default function Games({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [selected, setselected] = useState({});
	const [skins, setSkins] = useState([]);
	// useEffect(()=>{
	//     setSkins(data)
	// },[skinType])
	const {user} = useUser();
	console.log(user);
	useEffect(() => {
		if (user) {
			async function fetchOwnedSkins() {
				try {
					const res = await fetch(
						"http://localhost:4000/player_skins?player_id=" + user.id
					);
					if (res.error) {
						throw new Error(res.error);
					}
					const data = await res.json();
					setSkins(data);
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
export function Homecontext() {
	return useContext(HomeContext);
}
