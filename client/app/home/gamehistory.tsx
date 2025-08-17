import { Gamepad2 } from "lucide-react";
import HistoryItem from "./historyitem";

export default function GameHistory({ user, games }) {
    return (
        <div className="flex-1/2 h-[40%] bg-[#2b24423d] rounded-xl flex flex-col gap-2 border border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm overflow-hidden ">
            <h1 className="flex items-center gap-2 text-lg font-extrabold text-white p-4 w-full border-b border-[#7b5ddf44] tracking-wide bg-[#ffffff08] rounded-t-xl">
                <Gamepad2 className="w-10 h-10 text-white p-2 bg-gradient-to-r from-blue-400 to-[blue] rounded-lg shadow-lg" />
                Game History
            </h1>

            <div className="grid grid-cols-5 justify-items-center text-[#b9b3dfcc] text-xs font-extrabold uppercase tracking-wider px-6 py-2 border-b border-[#7b5ddf26] bg-[#ffffff04]">
                <div>Date</div>
                <div>Opponent</div>
                <div>Result</div>
                <div>Score</div>
                <div>Gold</div>
            </div>

            {/* Scrollable table body takes all remaining space */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2 space-y-2 h-100">
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
    );
}