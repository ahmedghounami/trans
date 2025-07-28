"use client";
import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import HistoryItem from "./historyitem";
import ProfileHeader from "./profileheader";
import Games_status from "./games_status";


export default function Profile() {
    const [games, setGames] = useState([]);
    useEffect(() => {
        const fetch_games = async () => {
            const response = await fetch("http://localhost:4000/games/1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.error("Failed to fetch games");
                return;
            }
            const data = await response.json();
            setGames(data);
        }
        fetch_games();
    }
        , []);

    const { user, loading } = useUser();
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
    }
    const profileImage = user?.picture;
    const name = user?.name;

    return (
        <div className="flex flex-col h-full ">
            < ProfileHeader profileImage={profileImage} name={name} />
            {/* ////////////////////////////////////////////////////////// */}
            <div className="flex-1/3 flex gap-2 m-5">
                <div className="flex-1/2 bg-[#352c523d] rounded-xl flex flex-col gap-2 border border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm">
                    <h1 className="text-lg font-extrabold text-white p-4 w-full border-b border-[#7b5ddf44] tracking-wide bg-[#ffffff08] rounded-t-xl">
                        🎮 Game History
                    </h1>

                    <div className="grid grid-cols-5 justify-items-center text-[#b9b3dfcc]  text-xs font-extrabold uppercase tracking-wider px-6 py-2 border-b border-[#7b5ddf26] bg-[#ffffff04]">
                        <div>Date</div>
                        <div>Opponent</div>
                        <div>Result</div>
                        <div>Score</div>
                        <div>Gold</div>
                    </div>

                    <div className="overflow-y-auto max-h-[10vh] sm:max-h-[30vh] md:max-h-[30vh] lg:max-h-[30vh] custom-scrollbar px-3 py-2 space-y-2">
                        {games.map((game) => {
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
                            )
                        })}

                    </div>
                </div>

                <div className="flex-1/2 flex flex-col gap-2">
                    <div className="flex-1/2 bg-[#5c45a85c] rounded-lg p-4 flex gap-2" >
                        <Games_status
                            userId={user.id}
                        />
                    </div>
                    <div className="flex-1/2 bg-[#5c45a85c] rounded-lg p-4 flex gap-2">
                    </div>
                </div>
            </div>
        </div>
    );
}