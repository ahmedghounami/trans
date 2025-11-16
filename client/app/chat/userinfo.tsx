"use client";

import { Snippet } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import AvatarWithPresence from "../components/AvatarWithPresence";

export default function UserInfo({
  user,
  setSelected,
  selected,
  me,
  messages
}: {
  user: {
    id: number;
    name: string;
    picture: string;
    me: number;
    messages: any[];
  };
  selected: number;
  setSelected: (id: number) => void;
}) {
  const [lastmessage, setLastMessage] = useState("");

  const selectedhandler = () => {
    setSelected(user.id);
  };

  
  useEffect(() => {  
    const fetchLastMessage = async () => {
      try {
        const res = await fetch(`http://localhost:4000/lastmessage/${me}/${user.id}`);
        if (!res.ok) throw new Error("Response not ok");

        const data = await res.json();
        if (data && data.content) {
          setLastMessage(data.content);
        } else {
          setLastMessage(""); // Clear if no message
          console.log("No message data received");
        }
      } catch (error) {
        console.error("Error fetching last message:", error);
        setLastMessage("");
      }
    };
    fetchLastMessage();
  }, [me, user?.id, messages]);


  return (
    <div
      key={user.id}
      className={`flex p-1 items-center hover:bg-[#a9a8a847] rounded-lg transition-colors duration-200 cursor-pointer ${selected === user.id ? 'bg-[#a9a8a847]' : ''}`}
      onClick={selectedhandler}
    >
      <div className="m-2">
        <AvatarWithPresence userId={user.id} src={user.picture || "/profile.png"} alt={user.name} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-white font-semibold">{user.name}</h3>
        <p className="text-gray-400 text-sm">{lastmessage || "No messages yet"}</p>
      </div>

    </div>
  );
}
