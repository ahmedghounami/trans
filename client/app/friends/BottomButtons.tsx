"use client";

import { useState, useEffect } from "react";
import AddFriends from "./AddFriend";
import Requests from "./Requests";
import { useUser } from "../Context/UserContext";
import socket from "@/app/socket";

export default function BottomButtons({ onRefreshFriends }) {
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(0);
  const { user } = useUser();

  // Fetch number of pending friend requests
  const fetchRequestsCount = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:4000/friends/myrequests?userId=${user.id}`);
      const data = await res.json();
      setPendingRequests(data.data?.length || 0);
    } catch (err) {
      console.error("Failed to fetch requests count:", err);
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchRequestsCount();

    socket.emit("join", user.id);

    // Listen for incoming requests or when friends list is updated
    socket.on("friends:request:incoming", fetchRequestsCount);
    socket.on("friends:updated", fetchRequestsCount);

    return () => {
      socket.off("friends:request:incoming", fetchRequestsCount);
      socket.off("friends:updated", fetchRequestsCount);
    };
  }, [user]);

  const handleCloseRequests = () => {
    setShowRequests(false);
  };

  return (
    <>
      <div className="flex justify-between gap-4 mt-4 sticky bottom-0 px-4 py-2">
        <button
          onClick={() => setShowAddFriends(true)}
          className="bg-purple-700/40 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors uppercase"
        >
          Add Friends
        </button>

        <button
          onClick={() => setShowRequests(true)}
          className="relative bg-purple-700/40 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors uppercase"
        >
          Requests
          {pendingRequests > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
              {pendingRequests > 9 ? "9+" : pendingRequests}
            </span>
          )}
        </button>
      </div>

      {showAddFriends && <AddFriends onClose={() => setShowAddFriends(false)} />}
      {showRequests && (
        <Requests
          onClose={handleCloseRequests}
          onFriendAccepted={onRefreshFriends}
        />
      )}
    </>
  );
}
