import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket"], // optional, but can prevent polling bugs
  autoConnect: true,
  withCredentials: true,
});

export default socket;
