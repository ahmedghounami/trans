"use client";

import { Snippet } from "next/font/google";
import { Suspense, useEffect, useState } from "react";

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
        const res = await fetch(`/api/lastmessage/${me}/${user.id}`);
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
      <img
        src={user.picture}
        alt={user.name}
        className="w-12 h-12 rounded-full m-2 border-2 border-purple-600 shadow-md object-cover"
      />
      <div className="flex flex-col">
        <h3 className="text-white font-semibold">{user.name}</h3>
        <p className="text-gray-400 text-sm">{lastmessage || "No messages yet"}</p>
      </div>

    </div>
  );
}
