import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket"], // optional, but can prevent polling bugs
  autoConnect: true,
  withCredentials: true,
  reconnectionDelay: 10000, // defaults to 1000
  reconnectionDelayMax: 10000 // defaults to 5000
});

// Add connection logging
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
  
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("🔴 Socket connection error:", error);
});

export default socket;
