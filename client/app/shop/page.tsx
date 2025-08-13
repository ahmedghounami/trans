"use client";
import { useState, useEffect } from "react";
import Tables from "./Tables";
import Balls from "./Balls";
import Paddles from "./Paddles";

type User = {
  id: number;
  name: string;
  gold: number;
};

export default function Shop() {
  const [category, setCategory] = useState<"tables" | "balls" | "paddles">("tables");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 🔹 Mock fetch user (replace with real API call later)
  useEffect(() => {
    // Example: simulate fetching user from backend
    setCurrentUser({ id: 1, name: "Hatim", gold: 500 });
  }, []);

  if (!currentUser) {
    return (
      <div className="text-center mt-20">
        <p>Loading user...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Welcome to Shop Page</h1>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setCategory("tables")}
            className={`px-6 py-2 text-sm font-semibold uppercase ${
              category === "tables"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400"
            }`}
          >
            Tables
          </button>
          <button
            onClick={() => setCategory("balls")}
            className={`px-6 py-2 text-sm font-semibold uppercase ${
              category === "balls"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400"
            }`}
          >
            Balls
          </button>
          <button
            onClick={() => setCategory("paddles")}
            className={`px-6 py-2 text-sm font-semibold uppercase ${
              category === "paddles"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400"
            }`}
          >
            Paddles
          </button>
        </div>
      </div>

      {category === "tables" && <Tables currentUser={currentUser} />}
      {category === "balls" && <Balls currentUser={currentUser} />}
      {category === "paddles" && <Paddles currentUser={currentUser} />}
    </div>
  );
}
