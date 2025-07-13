"use client";
import { useEffect, useState } from "react";
import socket from "../socket";
import { RiSendPlane2Fill } from "react-icons/ri";

export default function SendMessage({
  me,
  selected,
}: {
  me: number;
  selected: number;
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected");
      socket.emit("join", me);
    });
    socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [me]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      content: message,
      sender_id: me,
      receiver_id: selected,
    };

    socket.emit("chat message", payload);
    console.log("📤 Sent message:", payload);
    setMessage("");
  };

  return (
    <div className="p-4 border-t border-gray-600 ">
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full py-3 pl-5 pr-12 bg-[#2c2c2c] text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-400 active:scale-95 transition-transform duration-150"
        >
          <RiSendPlane2Fill size={22} />
        </button>
      </div>
    </div>
  );
}
