"use client";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import AvatarWithPresence from "../components/AvatarWithPresence";

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
      <AvatarWithPresence userId={opponent.id} src={opponent.picture || "/profile.png"} alt="opponent" sizeClass="w-6 h-6" imgClass="rounded-full" />
      {opponent.name}
    </div>
  );
}
