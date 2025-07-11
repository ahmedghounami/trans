"use client";
import { useEffect, useState } from "react";
import socket from "../socket";

export default function SendMessage({
  me,
  selected,
  setUpdate,
  update,
}: {
  me: number;
  selected: number;
  setUpdate: (update: number) => void;
  update: number;
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Only log once
    const handleConnect = () => console.log("✅ Socket connected");
    const handleDisconnect = () => console.log("🔌 Socket disconnected");

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

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
    setUpdate(update + 1);
  };

  return (
    <div className="p-4 flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="border p-2 rounded w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
