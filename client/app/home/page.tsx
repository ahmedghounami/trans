
"use client"

import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import Loading from "../components/loading";
import PingPongAchievements from "./cards";
import GameHistory from "./gamehistory";
import PingPongPerformanceChart from "./chart";
import { Coins, Crown, Flame, Trophy } from "lucide-react";



const AchievementCard = ({ icon: Icon, name, progress, total, completed = false, tier = "bronze" }) => {
    const progressPercentage = total ? (progress / total) * 100 : 100;
    if (completed) tier = "gold";

    const tierStyles = {
        gold: "border-yellow-400/50 shadow-lg shadow-yellow-400/30 bg-gradient-to-br from-yellow-600/20 to-purple-600/20",
        silver: "border-blue-400/40 shadow-lg shadow-blue-400/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20",
        bronze: "border-purple-600/30 shadow-lg shadow-purple-600/10 bg-gradient-to-br from-purple-900/30 to-black/40",
    };

    const tierColors = {
        gold: "from-yellow-400 to-yellow-600",
        silver: "from-blue-400 to-purple-500",
        bronze: "from-purple-500 to-blue-600",
    };

    return (
        <div
            className={`relative flex flex-col justify-between backdrop-blur-md rounded-xl w-full  p-4 border transition-all duration-300 
            hover:scale-102 hover:shadow-xl ${tierStyles[tier]} ${completed ? "animate-pulse-slow" : ""}`}
        >
            {completed && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">✓</span>
                </div>
            )}

            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${tierColors[tier]} shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-sm truncate">{name}</h3>
            </div>

            {total ? (
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-purple-200">
                        <span>{progress}/{total}</span>
                        <span className="font-semibold text-white">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="relative w-full bg-black/40 rounded-full h-2 ">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${completed
                                ? "from-green-400 to-emerald-500"
                                : tierColors[tier]
                                }`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    </div>
                </div>
            ) : (
                <p className="text-green-400 font-bold text-xs uppercase">Mastered!</p>
            )}
        </div>
    );
};
export default function HomePage() {
    const { user, loading } = useUser();
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetch_user = async () => {
            try {
                const response = await fetch(`/api/games/${user.id}`, {
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

    const gameCount = games.length;
    const totalGold = user.gold || 0;
    const streak = (() => {
        let maxStreak = 0, current = 0;
        for (let i = 0; i < games.length; i++) {
            if (games[i].winner_id === user.id) current++;
            else {
                maxStreak = Math.max(maxStreak, current);
                current = 0;
            }
        }
        return Math.max(maxStreak, current);
    })();
    return (
        <div className="flex flex-col gap-10 h-full p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <PingPongPerformanceChart user={user} games={games} />
                <PingPongAchievements user={user} games={games} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="flex flex-col gap-6 border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm rounded-lg p-6 border bg-[#2b24423d]">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Achievements</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <AchievementCard icon={Trophy} name="First Victory" completed={gameCount > 0} />
                        <AchievementCard icon={Flame} name="Streak Master" progress={streak} total={10} completed={streak >= 10} />
                        <AchievementCard icon={Coins} name="Gold Master" progress={totalGold} total={1000} completed={totalGold >= 1000} />
                        <AchievementCard icon={Crown} name="Champion" completed />
                    </div>
                </div>
                <GameHistory user={user} games={games} />
            </div>
        </div>

    );
}

