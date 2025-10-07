"use client";
import { useState, useEffect } from "react";
import BuyItem from "./BuyFunction";
import { ShoppingCart } from "lucide-react";


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

  useEffect(() => {
    async function fetchTables() {
      try {
        const res = await fetch("/api/tables");
        if (!res.ok) throw new Error("Failed to fetch tables");
        const data: Item[] = await res.json();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTables();
  }, []);

  return (
    <div className="mx-auto p-4 sm:p-10">
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-4 border-purple-500/20 rounded-xl shadow-lg flex flex-col
            relative bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md cursor-pointer
            transition-all duration-300 hover:scale-102 hover:border-purple-400/40 justify-between items-start"
          >
            {/* Image */}
            <div className="w-full">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-auto sm:h-60 md:h-72 lg:h-75 object-cover mb-4
                border-purple-500/20 shadow-lg shadow-purple-500/10"
              />
            </div>
            <div className="w-full flex flex-col items-start p-4 gap-4">
              {/* Name */}
              <span className="text-left text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
                {item.name}
              </span>
              {/* Description */}
              <span className="text-left text-base sm:text-xl text-gray-500 break-words">
                This is a Description of the Table, it is very good and you should buy it, trust me.
              </span>
              {/* Price */}
              <span className="text-left text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                ${item.price}
              </span>
            </div>
            {/* Buy Button */}
            <div className="w-full px-4 pb-4">
              <button
                onClick={() => BuyItem(currentUser.id, item.id, item.price)}
                className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300
                  font-medium rounded-lg text-xl py-2.5 flex items-center gap-2 justify-center
                  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart /> Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
