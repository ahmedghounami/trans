"use client";
import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import Loading from "../components/loading";
import { Gamepad2 } from "lucide-react";
import PingPongAchievements from "./achievement";
import HistoryItem from "./historyitem";
import GameHistory from "./gamehistory";
import PingPongPerformanceChart from "./chart";

export default function HomePage() {
    const { user, loading } = useUser();
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetch_user = async () => {
            try {
                const response = await fetch(`http://localhost:4000/games/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch user");
                    return;
                }
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (user?.id) {
            fetch_user();
        }
    }, [user?.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-white animate-pulse">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col p-4 h-full w-full">

            <div className="relative flex-1 justify-between flex gap-2 overflow-hidden">
                <GameHistory user={user} games={games} />
                <PingPongPerformanceChart user={user} games={games} />
            </div>
            <div className="mb-4">
                <PingPongAchievements user={user} games={games} />
            </div>
        </div>
    );
}
