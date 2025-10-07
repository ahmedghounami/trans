"use client";

import { UserX, Star, MessageCircle, Gamepad2, Trophy, TrendingDown } from "lucide-react";
import { useEffect } from "react";
type UserType = {
  id: number;
  name: string;
  level: number;
  status: string;
  totalGames: number;
  wins: number;
  loss: number;
  is_favorite?: boolean;
};

export default function UserInfo({
  user,
  currentUser,
  setUsers,
}: {
  user: UserType;
  currentUser: { id: number } | null;
  setUsers: (users: UserType[]) => void;
}) {
  
  const sortUsersByFavorite = (users) => {
    return [...users].sort((a, b) => {
      const favA = a.is_favorite ? 1 : 0;
      const favB = b.is_favorite ? 1 : 0;
      return favB - favA; // Favorites first
    });
  };


  const handleToggleFavorite = async () => {
    if (!currentUser) return;

    const userId = currentUser.id;
    const friendId = user.id;

    try {
      const endpoint = user.is_favorite
        ? "/api/friends/removefavorite"
        : "/api/friends/setfavorite";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, friendId }),
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");

      setUsers((prev) => {
        // Update the specific friend’s favorite status
        const updated = prev.map((u) =>
          u.id === user.id ? { ...u, is_favorite: !u.is_favorite } : u
        );

        // Sort: favorites on top
        return sortUsersByFavorite(updated);
        
      });
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const removeFriend = async () => {
    if (!currentUser) return;

    const userId = currentUser.id;
    const friendId = user.id;

    try {
      const res = await fetch(`/api/friends/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, friendId }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Remove friend response:", text);
        throw new Error(`Failed to remove friend, status: ${res.status}`);
      }

      // Update local state
      setUsers((prev) => prev.filter((u) => u.id !== friendId));
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  return (
    <div className="bg-purple-700/40 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between hover:bg-purple-700/50 transition-all">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggleFavorite}
          className={`transition-colors ${
            user.is_favorite ? "text-yellow-400" : "text-white"
          }`}
        >
          <Star className="w-6 h-6" />
        </button>

        <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
          <img
            src={user.picture}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-lg">
            {user.name}{" "}
            <span className="text-orange-400 text-sm">lvl {user.level || 0}</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button>
            <MessageCircle className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-white" />
          <span className="text-white text-sm">{user.totalGames || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-white" />
          <span className="text-white text-sm">{user.wins || 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-white" />
          <span className="text-white text-sm">{user.loss || 0}</span>
        </div>

        <button
          onClick={removeFriend}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          <UserX className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
