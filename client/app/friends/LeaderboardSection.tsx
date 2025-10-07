"use client";

import { useState, useEffect, useCallback } from "react";
import UsersCard from "./UsersCard";
import BottomButtons from "./BottomButtons";
import Loading from "../components/loading";
import { useUser } from "../Context/UserContext";

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

const sortUsersByFavorite = (users) => {
  return [...users].sort((a, b) => {
    const favA = a.is_favorite ? 1 : 0;
    const favB = b.is_favorite ? 1 : 0;
    return favB - favA; // Favorites first
  });
};

const LeaderboardSection = () => {
  const { user, loading } = useUser();
  const [friends, setFriends] = useState<UserType[]>([]);
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false); // trigger re-fetch

  // Reusable fetch function
  const fetchFriends = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/friends/accepted?userId=${user.id}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setFriends(sortUsersByFavorite(data.data));
    } catch (err) {
      console.error("Failed to fetch friends:", err);
    }
  }, [user]);

  // Fetch friends initially and whenever refreshToggle changes
  useEffect(() => {
    fetchFriends();
  }, [user, fetchFriends, refreshToggle]);


  if (loading) return <Loading />;

  return (
    <div className="w-full max-w-6xl p-2 relative flex flex-col h-screen max-h-screen">
      <BottomButtons
        onAddFriends={() => setShowAddFriends(true)}
        onRequests={() => setShowRequests(true)}
      />

      <UsersCard
        friends={friends}
        setUsers={setFriends}
        // Optional: pass refresh function to child to trigger re-fetch
      />
    </div>
  );
};

export default LeaderboardSection;
