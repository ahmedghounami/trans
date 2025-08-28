



"use client";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import HistoryItem from "../historyitem";
import ProfileHeader from "../profileheader";
import { useParams, useRouter } from "next/navigation";


import PingPongAchievements from "../achievement";
import { Gamepad2 } from "lucide-react";
import Loading from "@/app/components/loading";

export default function Profile() {
    const [games, setGames] = useState([]);
    const [user, setUser] = useState(null); // Changed from array to null
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();
    const { user: currentUser } = useUser();
    useEffect(() => {
        console.log("User ID from params:", id);
    }, [id]);
    
    useEffect(() => {
        const fetch_user = async () => {
            try {
                const response = await fetch(`/api/users/${id}`, {
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
                const response = await fetch(`/api/games/${id}`, {
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
            <ProfileHeader user={user} games={games} />
            {/* ////////////////////////////////////////////////////////// */}
            <div className="flex-1/5 flex gap-2 m-5">
                <div className="flex-1/2 bg-[#2b24423d] rounded-xl flex flex-col gap-2 border border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm">
                    <h1 className=" flex items-center gap-2 text-lg font-extrabold text-white p-4 w-full border-b border-[#7b5ddf44] tracking-wide bg-[#ffffff08] rounded-t-xl">
                        <Gamepad2 className="w-10 h-10 text-white p-2 bg-gradient-to-r from-blue-400 to-[blue] rounded-lg shadow-lg"/> Game History
                    </h1>

                    <div className="grid grid-cols-5 justify-items-center text-[#b9b3dfcc] text-xs font-extrabold uppercase tracking-wider px-6 py-2 border-b border-[#7b5ddf26] bg-[#ffffff04]">
                        <div>Date</div>
                        <div>Opponent</div>
                        <div>Result</div>
                        <div>Score</div>
                        <div>Gold</div>
                    </div>

                    <div className="overflow-y-auto max-h-[40vh] custom-scrollbar px-3 py-2 space-y-2">
                        {games.length > 0 ? (
                            games.map((game) => {
                                const isPlayer1 = user.id === game.player1_id;
                                const myScore = isPlayer1 ? game.player1_score : game.player2_score;
                                const opponentScore = isPlayer1 ? game.player2_score : game.player1_score;
                                const myGold = isPlayer1 ? game.player1_gold_earned : game.player2_gold_earned;
                                const opponentId = isPlayer1 ? game.player2_id : game.player1_id;
                                const didWin = game.winner_id === user.id;
                                const isDraw = game.winner_id === 0;
                                return (
                                    <HistoryItem
                                        isPlayer1={isPlayer1}
                                        date={game.date}
                                        opponentId={opponentId}
                                        opponentScore={opponentScore}
                                        myScore={myScore}
                                        myGold={myGold}
                                        didWin={didWin}
                                        isDraw={isDraw}
                                        key={game.id}
                                    />
                                );
                            })
                        ) : (
                            <div className="text-center text-gray-400 py-8">
                                No games played yet
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1/2 flex flex-col gap-2">
                    <div className="flex-1 bg-[#2b24423d] rounded-lg p-4 flex gap-2 border border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm">
                        <PingPongAchievements className="text-purple-400 w-6 h-6" games={games} user={user} />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}