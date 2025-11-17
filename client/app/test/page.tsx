"use client";
import { useEffect, useState } from "react";

export default function WebSocketTest() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to Fastify WebSocket server
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket");
      ws.send("Hello from Next.js client!");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">WebSocket Messages</h1>
      <ul className="mt-2 list-disc list-inside">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => socket?.send("Another message from frontend!")}
      >
        Send Another Message
      </button>
    </div>
  );
}
