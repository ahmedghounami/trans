
"use client"

import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import Loading from "../components/loading";
import PingPongAchievements from "./cards";
import GameHistory from "./gamehistory";
import PingPongPerformanceChart from "./chart";
import { Coins, Crown, Flame, Trophy, LucideIcon } from "lucide-react";
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

// Type definition for tier levels
type TierType = "gold" | "silver" | "bronze";

// Props interface for AchievementCard component
interface AchievementCardProps {
    icon: LucideIcon;
    name: string;
    progress: number;
    total: number;
    completed?: boolean;
    tier?: TierType;
}

const AchievementCard = ({ icon: Icon, name, progress, total, completed = false, tier = "bronze" }: AchievementCardProps) => {
    const progressPercentage = total ? (progress / total) * 100 : 100;
    let displayTier: TierType = tier;
    if (completed) displayTier = "gold";

    const tierStyles: Record<TierType, string> = {
        gold: "border-yellow-400/50 shadow-lg shadow-yellow-400/30 bg-gradient-to-br from-yellow-600/20 to-purple-600/20",
        silver: "border-blue-400/40 shadow-lg shadow-blue-400/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20",
        bronze: "border-purple-600/30 shadow-lg shadow-purple-600/10 bg-gradient-to-br from-purple-900/30 to-black/40",
    };

    const tierColors: Record<TierType, string> = {
        gold: "from-yellow-400 to-yellow-600",
        silver: "from-blue-400 to-purple-500",
        bronze: "from-purple-500 to-blue-600",
    };

    return (
        <div
            className={`relative flex flex-col justify-between backdrop-blur-md rounded-xl w-full  p-4 border transition-all duration-300 
            hover:scale-102 hover:shadow-xl ${tierStyles[displayTier]} ${completed ? "animate-pulse-slow" : ""}`}
        >
            {completed && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">✓</span>
                </div>
            )}

            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${tierColors[displayTier]} shadow-md`}>
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
                                : tierColors[displayTier]
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
    const searchParams = useSearchParams();
    
    // Type assertion for user to access properties safely
    const typedUser = user as { id: number; username?: string; email?: string } | null;

    // ========================================
    // Handle Google OAuth Redirect
    // ========================================
    // After Google authentication, user gets redirected here with token or error in URL
    useEffect(() => {
        const token = searchParams.get('token');  // JWT token from server
        const error = searchParams.get('error');  // Error code if something went wrong
        
        // If authentication failed, show error message
        if (error) {
            // Map error codes to user-friendly messages
            const errorMessages: { [key: string]: string } = {
                'no_code': 'Authorization code not received from Google',
                'no_access_token': 'Failed to get access token from Google',
                'db_error': 'Database error occurred',
                'insert_failed': 'Failed to create user account',
                'oauth_failed': 'Google authentication failed'
            };
            alert(errorMessages[error] || 'Authentication failed. Please try again.');
            // Clean up URL (remove error parameter)
            window.history.replaceState({}, '', '/home');
            return;
        }
        
        // If we got a token, save it and authenticate user
        if (token) {
            // Save JWT token to browser cookie (valid for 7 days)
            Cookies.set("token", token, {
                expires: 7,                    // Token expires in 7 days
                secure: false,                 // Set to false for localhost (use true in production with HTTPS)
                sameSite: "lax",              // Protect against CSRF attacks
            });
            
            // Clean up URL (remove token from address bar)
            window.history.replaceState({}, '', '/home');
            
            // Reload page to fetch user data with new token
            window.location.reload();
        }
    }, [searchParams]);

    useEffect(() => {
        const fetch_user = async () => {
            // Safety check: only fetch if user exists and has an id
            if (!typedUser || !typedUser.id) return;
            
            try {
                const response = await fetch(`http://localhost:4000/games/${typedUser.id}`, {
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

        fetch_user();
    }, [typedUser]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-white animate-pulse">
                <Loading />
            </div>
        );
    }

    const gameCount = games.length;
    const totalGold = (user as any)?.gold ?? 0;
    const streak = (() => {
        // If we don't have a user yet, there's no streak to compute
        if (!(user as any)?.id) return 0;
        let maxStreak = 0, current = 0;
        for (let i = 0; i < games.length; i++) {
            if ((games[i] as any)?.winner_id === (user as any).id) current++;
            else {
                maxStreak = Math.max(maxStreak, current);
                current = 0;
            }
        }
        return Math.max(maxStreak, current);
    })();
    return (
        <div className="flex flex-col gap-4 min-h-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PingPongPerformanceChart user={user} games={games} />
                <PingPongAchievements user={user} games={games} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

                <div className="flex flex-col gap-6 border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm rounded-lg p-6 border bg-[#2b24423d]">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Achievements</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <AchievementCard icon={Trophy} name="First Victory" progress={gameCount} total={1} completed={gameCount > 0} />
                        <AchievementCard icon={Flame} name="Streak Master" progress={streak} total={10} completed={streak >= 10} />
                        <AchievementCard icon={Coins} name="Gold Master" progress={totalGold} total={1000} completed={totalGold >= 1000} />
                        <AchievementCard icon={Crown} name="Champion" progress={0} total={0} completed />
                    </div>
                </div>
                <GameHistory user={user} games={games} />
            </div>
        </div>

    );
}

