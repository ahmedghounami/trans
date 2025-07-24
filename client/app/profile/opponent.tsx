"use client";
import { useEffect, useState } from "react";

export default function OpponentInfo({ id }:
  { id: string }

) {
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    const fetchOpponent = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${id}`);
        const data = await res.json();
        setOpponent(data);
      } catch (err) {
        console.error("Failed to load opponent:", err);
      }
    };
    fetchOpponent();
  }, [id]);

  if (!opponent) return <span>Loading...</span>;

  return (
    <span className="flex items-center gap-2 text-sm text-[#d6d5d5cd] font-light tracking-tight">
      <img
        src={opponent.picture}
        alt="opponent"
        className="w-6 h-6 rounded-full"
      />
      {opponent.name}
    </span>
  );
}
