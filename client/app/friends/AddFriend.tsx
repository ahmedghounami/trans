"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import Loading from "../components/loading";

// Cancel friend request function
export async function CancelFriendRequest(userId: number, friendId: number) {
  try {
    const res = await fetch(`/api/friends/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, friendId }),
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Send a friend request
export async function AddFriendRequest(userId: number, friendId: number) {
  try {
    const res = await fetch(`/api/friends`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, friendId }),
    });
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
}

type UserType = {
  id: number;
  name: string;
  picture?: string;
  gold?: number;
};

const AddFriend = ({ onClose }: { onClose: () => void }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [requestedIds, setRequestedIds] = useState<number[]>([]); // requests I sent
  const [incomingRequestIds, setIncomingRequestIds] = useState<number[]>([]); // requests sent to me
  const [friendsIds, setFriendsIds] = useState<number[]>([]);
  const { user, loading } = useUser();

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
        const data: UserType[] = await res.json();
        if (isMounted) setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoadingUsers(false);
      }
    };

    const fetchOutgoingRequests = async () => {
      try {
        const res = await fetch(`/api/friends/request?userId=${user.id}`);
        const data = await res.json();
        const ids = data.data.map((r: { friend_id: number }) => r.friend_id);
        setRequestedIds(ids);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchIncomingRequests = async () => {
      try {
        const res = await fetch(`/api/friends/myrequests?userId=${user.id}`);
        const data = await res.json();
        const ids = data.data.map((r: { user_id: number }) => r.user_id);
        setIncomingRequestIds(ids);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchFriends = async () => {
      try {
        const res = await fetch(`/api/friends/accepted?userId=${user.id}`);
        const data = await res.json();
        const ids = data.data.map((f: { id: number }) => f.id);
        setFriendsIds(ids);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
    fetchOutgoingRequests();
    fetchIncomingRequests();
    fetchFriends();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleAddFriend = async (friendId: number) => {
    if (!user) return;
    if (requestedIds.includes(friendId)) return;

    const success = await AddFriendRequest(user.id, friendId);
    if (success) setRequestedIds((prev) => [...prev, friendId]);
  };

  const handleCancelRequest = async (friendId: number) => {
    if (!user) return;

    const success = await CancelFriendRequest(user.id, friendId);
    if (success) setRequestedIds((prev) => prev.filter((id) => id !== friendId));
  };

  // Filter users:
  // - Remove self
  // - Remove already friends
  // - Remove users who sent me a request
  const filteredUsers = users
    .filter((u) => u.id !== user?.id)
    .filter((u) => !friendsIds.includes(u.id))
    .filter((u) => !incomingRequestIds.includes(u.id))
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Loading />;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-xl font-bold mb-4">Add Friends</h2>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full mb-4 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-600"
        />

        <div className="max-h-64 overflow-y-auto space-y-3">
          {loadingUsers ? (
            <Loading />
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((u) => {
              const isRequested = requestedIds.includes(u.id);
              return (
                <div
                  key={u.id}
                  className="flex items-center justify-between p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                      <img
                        src={
                          u.picture ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`
                        }
                        alt={u.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-white">{u.name}</span>
                  </div>
                  <button
                    onClick={() =>
                      isRequested
                        ? handleCancelRequest(u.id)
                        : handleAddFriend(u.id)
                    }
                    className={`px-3 py-1 rounded-lg text-sm text-white transition-colors ${
                      isRequested
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {isRequested ? "Request sent" : "Add"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-center">No users found</p>
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
};

export default AddFriend;
