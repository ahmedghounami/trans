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

export default function Tables({ currentUser }: Props) {
	const [items, setItems] = useState<Item[]>([]);
	const [selected, setSelected] = useState<Item | null>(null);

	useEffect(() => {
		async function fetchTables() {
			try {
				const res = await fetch("http://localhost:4000/tables");
				if (!res.ok)
					throw new Error("Failed to fetch tables");
				const data: Item[] = await res.json();
				setItems(data);
				if (data.length > 0)
					setSelected(data[0]);
			} catch (err) {
				console.error(err);
			}
		}
		fetchTables();
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
						<div className="flex-shrink-0 w-full max-w-4xl p-4 border-4 border-blue-500 rounded-lg shadow-lg flex flex-col">
							{/* Image */}
							<img src={selected.img} alt={selected.name} className="w-full h-[500px] object-cover rounded-lg mb-4"/>
							{/* Info */}
							<div className="p-4 text-center flex flex-col justify-center">
								<h2 className="text-2xl font-bold truncate">{selected.name}</h2>
								<p className="text-lg">${selected.price}</p>
							</div>
						</div>
						{/* Buy Button */}
						<button onClick={() => BuyItem(currentUser.id, selected.id, selected.price)} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300">
							Buy
						</button>
					</>
				)}
			</div>
		</div>
	);
}

