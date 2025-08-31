import { io } from "socket.io-client";

const socket = io("/api/", {
  transports: ["websocket"], // optional, but can prevent polling bugs
  autoConnect: true,
  withCredentials: true,
  reconnectionDelay: 10000, // defaults to 1000
  reconnectionDelayMax: 10000 // defaults to 5000
});

export default socket;
