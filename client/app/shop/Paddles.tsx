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

export default function Paddles({ currentUser }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    async function fetchPaddles() {
      try {
        const res = await fetch("/api/paddles");
        if (!res.ok) throw new Error("Failed to fetch paddles");
        const data: Item[] = await res.json();
        setItems(data);
        if (data.length > 0) setSelected(data[0]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPaddles();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:space-x-10 relative">
      {/* left bar */}
      <div
        className="flex space-x-4 overflow-x-auto pb-4 md:flex-col md:space-x-0 md:space-y-4 md:w-1/3 ml-60 md:overflow-y-auto max-h-[85vh] md:pr-2 [scrollbar-width:thin] [scrollbar-color:#3B82F6_#E5E7EB] [&::-webkit-scrollbar]:w-2
			 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:bg-purple-950 "
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className={`flex-shrink-0 w-140 p-4 border rounded-lg cursor-pointer hover:shadow-lg flex flex-col items-center relative bg-gradient-to-br 
						from-black/40 to-purple-900/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 shadow-lg shadow-purple-500/10 ${
              selected.id === item.id ? "border-purple-500 shadow-lg" : ""
            }`}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-120 h-75 object-cover rounded-xl mb-2 transition-all duration-300 hover:scale-102"
            />
            <div className="text-lg font-semibold transition-all duration-300 hover:scale-120">
              ${item.price}
            </div>
          </div>
        ))}
      </div>
      {/* right bar */}
      <div className="mt-20 md:mt-28 md:w-2/3 md:self-start flex flex-col items-center">
        {selected && (
          <>
            <div className="relative bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:scale-102 hover:border-purple-400/40 w-230">
              {/* Name */}
              <span className="p-2 text-center flex flex-col justify-center text-3xl font-bold text-gray-900 dark:text-white">
                {selected.name}
              </span>
              {/* Image */}
              <div className="px-8 ">
                <img
                  src={selected.img}
                  alt={selected.name}
                  className="w-full h-[550px] object-cover rounded-3xl mb-4 relative bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md border border-purple-500/20 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:scale-102 hover:border-purple-400/40"
                />
              </div>
              <div className="p-8 flex items-center justify-between">
                {/* Price */}

                <span className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300 hover:scale-110">
                  ${selected.price}
                </span>
                {/* Buy Button */}
                <button
                  onClick={() =>
                    BuyItem(currentUser.id, selected.id, selected.price)
                  }
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-xl px-10 py-2.5 text-center
									 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 transition-all duration-300 hover:scale-110"
                >
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
