"use client"
import { useState } from "react";

type Item = {
	id: number;
	name: string;
	image: string;
	price: number;
};

type Props = {
	currentUser: { id: number; name: string };
	};

const items: Item[] = [
	{ id: 1, name: "ball1", image: "/ball.webp", price: 50 },
	{ id: 2, name: "ball2", image: "/ball.webp", price: 60 },
	{ id: 3, name: "ball3", image: "/ball.webp", price: 55 },
	{ id: 4, name: "ball4", image: "/ball.webp", price: 55 },
	{ id: 5, name: "ball5", image: "/ball.webp", price: 55 },
	{ id: 6, name: "ball6", image: "/ball.webp", price: 55 },
];

export default function Balls({ currentUser }: Props) {
	const [selected, setSelected] = useState<Item>(items[0]);

	return (
		<div className="flex flex-col md:flex-row md:space-x-10">
			{/* left bar */}
			<div className="flex space-x-4 overflow-x-auto pb-4 md:flex-col md:space-x-0 md:space-y-4 md:w-1/3 ml-60 md:overflow-y-auto md:max-h-screen md:pr-2">
				{items.map((item) => (
					<div key={item.id} onClick={() => setSelected(item)} className={`flex-shrink-0 w-140 p-4 border rounded-lg cursor-pointer hover:shadow-lg flex flex-col items-center ${selected.id === item.id ? "border-blue-500 shadow-lg" : ""}`}>
						<img src={item.image} alt={item.name} className="w-120 h-75 object-cover rounded-lg mb-2"/>
						<div className="text-lg font-semibold">${item.price}</div>
					</div>
				))}
			</div>
			{/* write bar */}
			<div className="mt-6 md:mt-0 md:w-2/3 md:sticky md:top-20 md:self-start flex flex-col items-center">
				<img src={selected.image} alt={selected.name} className="w-full max-w-4xl object-cover rounded-lg mb-4"/>
			</div>
		</div>
	);
}
