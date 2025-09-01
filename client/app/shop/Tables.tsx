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
    <div className="mx-auto p-10">
      <div className="grid grid-cols-4 gap-10 flex flex-col">
        {/* Card */}
        {items.map((item) => (
          <div key={item.id} className="border-4 border-purple-500/20 rounded-xl shadow-lg p-4 flex flex-col 
          items-center h-160 relative bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md cursor-pointer flex-shrink-0
          transition-all duration-300 hover:scale-102 hover:border-purple-400/40 justify-between">
            {/* Image */}
            <div className="w-full">
              <img 
                src={item.img}
                alt={item.name}
                className="w-full h-75 object-cover  transition-all duration-300 hover:scale-102" 
              />
            </div>
            <div className="p-8 flex flex-col items-center">
              {/* Name */}
              <span className="p-2 text-center flex flex-col justify-center text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300 hover:scale-110">
                ${item.name}
              </span>
              {/* Price */}
              <span className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300 hover:scale-110">
                ${item.price}
              </span>
            </div>
            {/* Buy Button */}
            <div className="flex justify-center">
              <button
                onClick={() => BuyItem(currentUser.id, item.id, item.price)}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 
                font-medium rounded-lg text-xl px-40 py-2.5 text-center
                dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 transition-all duration-300 hover:scale-110"
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
