import OpponentInfo from "./opponent";

export default function HistoryItem({ iisPlayer1, date, opponentId, opponentScore, myScore, myGold, didWin, isDraw, game }:
    {
        iisPlayer1: boolean,
        date: string,
        opponentId: string,
        opponentScore: number,
        myScore: number,
        myGold: number,
        didWin: boolean,
        isDraw: boolean,
        game: any
    }
) {
    return (
        <div
            className="grid grid-cols-5 justify-items-center items-center gap-2 text-white p-3 rounded-lg bg-[#ffffff0a] border border-[#7b5ddf22] hover:bg-[#ffffff15] transition-all duration-200 shadow-sm"
        >
            <span className=" text-[#ffffffe3] font-semibold text-xs ">
                {new Date(date).toLocaleDateString()}
            </span>

            <OpponentInfo id={opponentId} />

            <span
                className={`text-sm font-extrabold tracking-wide animate-pulse ${didWin ? "text-green-400" : isDraw ? "text-yellow-300" : "text-red-400"
                    }`}
            >
                {didWin ? "Won" : isDraw ? "Draw" : "Lost"}
            </span>

            <span className="text-sm text-white font-bold tracking-wide">
                {myScore} - {opponentScore}
            </span>

            <span className="text-sm text-cyan-300 font-bold animate-pulse">
                {myGold}
            </span>
        </div>
    );
}