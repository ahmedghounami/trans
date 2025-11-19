
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../Context/UserContext";
import ProfileHeader from "../profileheader";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import EditProfile from "../editProfile";

export default function Profile() {
    const [games, setGames] = useState<any[]>([]);
    const [user, setUser] = useState<any | null>(null); // Changed from array to null
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();
    const { user: currentUser } = useUser();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        console.log("User ID from params:", id);
    }, [id]);

    useEffect(() => {
        const fetch_user = async () => {
            try {
                const response = await fetch(`http://localhost:4000/users/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch user");
                    router.push("/404"); // Use router instead of window.location
                    return;
                }
                const data = await response.json();
                setUser(data); // This is a single object, not an array
            } catch (error) {
                console.error("Error fetching user:", error);
                router.push("/404");
            }
        };

        if (id) {
            fetch_user();
        }
    }, [id, router]);

    useEffect(() => {
        const fetch_games = async () => {
            try {
                const response = await fetch(`http://localhost:4000/games/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch games");
                    setGames([]); // Set empty array if failed
                    return;
                }
                const data = await response.json();
                setGames(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching games:", error);
                setGames([]);
                setLoading(false);
            }
        };

        if (id) {
            fetch_games();
        }
    }, [id]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen text-white animate-pulse">
                <Loading />
            </div>
        );
    }
    console.log("Current user from context:", currentUser);
    console.log("Fetched user:", user);

    return (
        <div className="flex flex-col h-full relative">
            {editMode && (
                <EditProfile
                    setEditMode={setEditMode}
                    editMode={editMode}
                    user={user}
                />
            )}
            <ProfileHeader user={user} games={games} setEditMode={setEditMode} />
            {/* ////////////////////////////////////////////////////////// */}
            <div className="flex-1/5 flex gap-4 m-5 flex-col">

                {/* Small RPS summary row */}
                <div className="w-[90%] mx-auto mt-4 flex items-center justify-between gap-6">
                    {/* Left: animated RPS summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="flex-1 rounded-2xl p-4 bg-gradient-to-r from-[#1e1330] to-[#241635] border border-[#6b3be033] shadow-inner text-white"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-[#bfb8e7] font-bold">RPS Summary</div>
                                <div className="text-sm text-gray-300">A quick overview for Rock-Paper-Scissors</div>
                            </div>
                            <img src="/rps.png" alt="rps" className="w-12 h-12 opacity-90" />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                            {/** compute simple stats */}
                            {(() => {
                                const rpsWins = games.filter((g: any) => g.winner_id === user.id).length;
                                const rpsDraws = games.filter((g: any) => g.winner_id === 0).length;
                                const rpsLosses = Math.max(0, games.length - rpsWins - rpsDraws);

                                return (
                                    <>
                                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-lg bg-black/30 border border-white/5">
                                            <div className="text-xs text-[#bfb8e7]">Wins</div>
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.05 }}
                                                className="text-xl font-bold text-green-300"
                                            >
                                                {rpsWins}
                                            </motion.div>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-lg bg-black/30 border border-white/5">
                                            <div className="text-xs text-[#bfb8e7]">Losses</div>
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.12 }}
                                                className="text-xl font-bold text-red-400"
                                            >
                                                {rpsLosses}
                                            </motion.div>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.03 }} className="p-3 rounded-lg bg-black/30 border border-white/5">
                                            <div className="text-xs text-[#bfb8e7]">Draws</div>
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.18 }}
                                                className="text-xl font-bold text-yellow-300"
                                            >
                                                {rpsDraws}
                                            </motion.div>
                                        </motion.div>
                                    </>
                                );
                            })()}
                        </div>
                    </motion.div>

                    {/* Right: circular win/loss percentage */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="w-44 h-44 flex items-center justify-center">
                        {(() => {
                            const rpsWins = games.filter((g: any) => g.winner_id === user.id).length;
                            const rpsDraws = games.filter((g: any) => g.winner_id === 0).length;
                            const rpsLosses = Math.max(0, games.length - rpsWins - rpsDraws);
                            const active = rpsWins + rpsLosses; // exclude draws for percent
                            const winPct = active > 0 ? Math.round((rpsWins / active) * 100) : 0;
                            const lossPct = active > 0 ? Math.round((rpsLosses / active) * 100) : 0;

                            const size = 140;
                            const stroke = 12;
                            const radius = (size - stroke) / 2;
                            const circumference = 2 * Math.PI * radius;
                            const winOffset = circumference - (winPct / 100) * circumference;

                            return (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                                        {/* background ring */}
                                        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#1f1f2a" strokeWidth={stroke} fill="transparent" />
                                        {/* loss ring (gray) */}
                                        <circle
                                            cx={size / 2}
                                            cy={size / 2}
                                            r={radius}
                                            stroke="#2b2b39"
                                            strokeWidth={stroke}
                                            fill="transparent"
                                        />
                                        {/* win progress */}
                                        <circle
                                            cx={size / 2}
                                            cy={size / 2}
                                            r={radius}
                                            stroke="#34d399"
                                            strokeWidth={stroke}
                                            fill="transparent"
                                            strokeDasharray={`${circumference} ${circumference}`}
                                            strokeDashoffset={winOffset}
                                            strokeLinecap="round"
                                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.8s ease' }}
                                        />
                                    </svg>

                                    <div className="absolute flex flex-col items-center">
                                        <div className="text-sm text-[#bfb8e7]">Win Rate</div>
                                        <div className="text-2xl font-bold text-white">{winPct}%</div>
                                        <div className="text-xs text-gray-400 mt-1">({rpsWins} / {active || rpsWins + rpsDraws})</div>
                                    </div>

                                    {/* small legend under circle */}

                                </div>
                            );
                        })()}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}