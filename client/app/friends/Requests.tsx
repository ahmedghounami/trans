"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";

type UserType = {
  id: number;
  name: string;
  picture?: string;
  level?: number;
};

export default function Requests({ onClose }: { onClose: () => void }) {
  const [requests, setRequests] = React.useState<UserType[]>([]);
  const [loadingRequests, setLoadingRequests] = React.useState(true);
  const { user, loading } = useUser();

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const fetchRequests = async () => {
      try {
        const res = await fetch(`/api/friends/myrequests?userId=${user.id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          console.log("Fetched requests:", data); // debug here
          setRequests(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        if (isMounted) setRequests([]);
      } finally {
        if (isMounted) setLoadingRequests(false);
      }
    };

    fetchRequests();

    return () => { isMounted = false; };
  }, [user]);



  const handleAccept = async (friendId: number) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/friends/accept`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, friendId }),
      });
      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== friendId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = async (friendId: number) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/friends/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, friendId }),
      });
      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== friendId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-xl font-bold mb-4">Friend Requests</h2>

        <div className="max-h-64 overflow-y-auto space-y-3">
          {loadingRequests ? (
            <p className="text-gray-400 text-center">Loading requests...</p>
          ) : requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img
                      src={
                        request.picture ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.name}`
                      }
                      alt={request.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white">{request.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(request.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No requests</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
