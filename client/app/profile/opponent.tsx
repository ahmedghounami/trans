"use client";
import { useEffect, useState } from "react";
import Loading from "../components/loading";

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

  if (!opponent) return <Loading />;
  return (
    <div className="flex gap-2 items-center font-bold text-sm text-[#d6d6d6]  tracking-tight cursor-pointer"
      onClick={() => {
        window.location.href = `/profile/${opponent.id}`;
      }
      }>
      <img
        src={opponent.picture}
        alt="opponent"
        className="w-6 h-6 rounded-full"
      />
      {opponent.name}
    </div>
  );
}
