/** @format */

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import SkinContainer from "../components/SkinContainer";

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
	const [me, setMe] = useState(0);
	useEffect(() => {
		async function fetchme() {
			try {
				const response = await fetch("http://localhost:4000/me", {
					method: "GET",
					headers: {
						authorization: `Bearer ${Cookies.get("token")}`,
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				console.log("Fetched user data:", data);
				setMe(data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
		fetchme();
	}, []);
	useEffect(() => {
		if (me) {
			async function fetchOwnedSkins() {
				try {
					const res = await fetch(
						"http://localhost:4000/player_skins?player_id=" + me.id
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
	}, [me]);

	return (
		<HomeContext.Provider
			value={{ skins, me, selected, setSkins, setselected }}>
			{children}
		</HomeContext.Provider>
	);
}
export function Homecontext() {
	return useContext(HomeContext);
}
