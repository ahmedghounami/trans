"use client";
import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import Tables from "./Tables";
import Balls from "./Balls";
import Paddles from "./Paddles";

// function Button

export default function Shop() {
  const { user, loading } = useUser();
  const [category, setCategory] = useState<"tables" | "balls" | "paddles">(
    "tables"
  );
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Failed to load user.
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-col flex-1 md:space-y-4">
      <div className="flex justify-center flex-none w-3/5 self-center relative">
        <button
          onClick={() => setCategory("tables")}
          className={`w-1/3 flex justify-center items-center h-14 cursor-pointer transition-all duration-300 ${
            category === "tables"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-white"
          }`}>
          Tables
        </button>
        <button
          onClick={() => setCategory("balls")}
          className={`w-1/3 flex justify-center items-center h-14 cursor-pointer transition-all duration-300 ${
            category === "balls"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-white"
          }`}>
          Balls
        </button>
        <button
          onClick={() => setCategory("paddles")}
          className={`w-1/3 flex justify-center items-center h-14 cursor-pointer transition-all duration-300${
            category === "paddles"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-white"
          }`}>
          Paddles
        </button>
      </div>
      {category === "tables" && <Tables currentUser={user} />}
      {category === "balls" && <Balls currentUser={user} />}
      {category === "paddles" && <Paddles currentUser={user} />}
    </div>
  );
}
