"use client";
import { useState, useEffect } from "react";
import BuyItem from "./BuyFunction";

interface Item {
	id: number;
	name: string;
	img: string;
	price: number;
}

type Props = {
	currentUser: { id: number; name: string };
};

export default function Balls({ currentUser }: Props) {
	const [items, setItems] = useState<Item[]>([]);
	const [selected, setSelected] = useState<Item | null>(null);

	useEffect(() => {
		async function fetchBalls() {
			try {
				const res = await fetch("http://localhost:4000/balls");
				if (!res.ok)
					throw new Error("Failed to fetch balls");
				const data: Item[] = await res.json();
				setItems(data);
				if (data.length > 0)
					setSelected(data[0]);
			} catch (err) {
				console.error(err);
			}
		}
		fetchBalls();
	}, []);

	return (
		<div className="flex flex-col md:flex-row md:space-x-10 relative">
			{/* left bar */}
			<div className="flex space-x-4 overflow-x-auto pb-4 md:flex-col md:space-x-0 md:space-y-4 md:w-1/3 ml-60 md:overflow-y-auto max-h-[85vh] md:pr-2 [scrollbar-width:thin] [scrollbar-color:#3B82F6_#E5E7EB] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-blue-500 [&::-webkit-scrollbar-thumb:hover]:bg-blue-600">
				{items.map((item) => (
					<div key={item.id}onClick={()=>setSelected(item)}className={`flex-shrink-0 w-140 p-4 border rounded-lg cursor-pointer hover:shadow-lg flex flex-col items-center ${selected.id === item.id ? "border-blue-500 shadow-lg" : ""}`}>
						<img src={item.img} alt={item.name} className="w-120 h-75 object-cover rounded-lg mb-2"/>
						<div className="text-lg font-semibold">${item.price}</div>
					</div>
				))}
			</div>
			{/* right bar */}
			<div className="mt-20 md:mt-28 md:w-2/3 md:self-start flex flex-col items-center">
				{selected && (
					<>
						<div className="relative bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:scale-102 hover:border-purple-400/40">
							<span className="p-2 text-center flex flex-col justify-center text-3xl font-bold text-gray-900 dark:text-white">{selected.name}</span>
							{/* Image */}
							<img src={selected.img} alt={selected.name} className="w-full h-[650px] object-cover rounded-3xl mb-4 md:w-1/3"/>
							{/* Info */}
							{/* <div className="p-12 text-center flex flex-col justify-center">
								{/* <h2 className="text-2xl font-bold truncate">{selected.name}</h2> */}
								{/* <span className="text-3xl font-bold text-gray-900 dark:text-white">{selected.name}</span> */}
								{/* <p className="text-lg">${selected.price}</p> */}
							{/* </div> */}
								{/* <span className="p-2 text-center flex flex-col justify-center text-3xl font-bold text-gray-900 dark:text-white">{selected.name}</span> */}
								<div className="p-8 flex items-center justify-between">
								<span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
								{/* Buy Button */}
								<button onClick={() => BuyItem(currentUser.id, selected.id, selected.price)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
									Buy
								</button>
        					</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

