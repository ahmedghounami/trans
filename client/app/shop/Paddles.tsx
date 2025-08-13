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
	{ id: 1, name: "paddle1", image: "/paddle.webp", price: 80 },
	{ id: 2, name: "paddle2", image: "/paddle.webp", price: 90 },
	{ id: 3, name: "paddle3", image: "/paddle.webp", price: 85 },
];

export default function Paddles({ currentUser }: Props)  {
	const [selected, setSelected] = useState<Item>(items[0]);

	return (
		<div className="flex flex-col md:flex-row md:space-x-10">
			<div className="flex space-x-4 overflow-x-auto pb-4 md:flex-col md:space-x-0 md:space-y-4 md:w-1/3">
				{items.map((item) => (
				<div
					key={item.id}
					onClick={() => setSelected(item)}
					className={`flex-shrink-0 w-36 p-4 border rounded-lg cursor-pointer hover:shadow-lg flex flex-col items-center
					${selected.id === item.id ? "border-blue-500 shadow-lg" : ""}`}
				>
					<img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-lg mb-2" />
					<div className="text-lg font-semibold">${item.price}</div>
				</div>
				))}
			</div>

			<div className="mt-6 md:mt-0 md:w-2/3 flex flex-col justify-center items-center">
				<img src={selected.image} alt={selected.name} className="w-full max-w-md object-cover rounded-lg mb-4" />

				<button
			className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
			onClick={async () => {
				try {
				const res = await fetch("http://localhost:4000/buy", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
					userId: currentUser.id,
					itemName: selected.name,
					itemPrice: selected.price,
					}),
				});

			const data = await res.json();

			if (data.success) alert(data.message);
			else alert("Purchase failed: " + data.error);
			} catch (err) {
			console.error(err);
			alert("Something went wrong");
			}
			}}
			>Buy
		</button>

			</div>
		</div>
	);
}
