"use client";
import { useUser } from "../Context/UserContext";

const history = [
    {
        id: 1,
        date: "2023-10-01",
        opponent: "@opponent1",
        result: "Win",
        score: "3-1",
        Goldearned: 150
    },
    {
        id: 2,
        date: "2023-10-02",
        opponent: "@opponent2",
        result: "Loss",
        score: "1-2",
        Goldearned: 50
    },
    {
        id: 3,
        date: "2023-10-03",
        opponent: "@opponent3",
        result: "Win",
        score: "4-0",
        Goldearned: 150
    },
    {
        id: 4,
        date: "2023-10-04",
        opponent: "@opponent4",
        result: "Draw",
        score: "2-2",
        Goldearned: 100
    },
    {
        id: 5,
        date: "2023-10-05",
        opponent: "@opponent5",
        result: "Win",
        score: "5-3",
        Goldearned: 150
    },
    {
        id: 6,
        date: "2023-10-06",
        opponent: "@opponent6",
        result: "Loss",
        score: "0-1",
        Goldearned: 50
    },
    {
        id: 7,
        date: "2023-10-07",
        opponent: "@opponent7",
        result: "Win",
        score: "2-1",
        Goldearned: 150
    },
    {
        id: 8,
        date: "2023-10-08",
        opponent: "@opponent8",
        result: "Loss",
        score: "1-3",
        Goldearned: 50
    },
    {
        id: 9,
        date: "2023-10-09",
        opponent: "@opponent9",
        result: "Win",
        score: "4-2",
        Goldearned: 150
    },
    {
        id: 10,
        date: "2023-10-10",
        opponent: "@opponent10",
        result: "Draw",
        score: "0-0",
        Goldearned: 100
    },
];

export default function Profile() {
    const { user, loading } = useUser();
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
    }
    const profileImage = user?.picture;
    const name = user?.name;

    return (
        <div className="flex flex-col h-full ">
            <div className="flex-1 relative flex flex-col justify-end items-center">

                <img src="/online.jpeg" alt="background"
                    className="absolute top-2 left-[2%] self-center w-[96%] h-[85%] object-cover rounded-2xl z-0"
                />

                <div className="flex bg-[#000000ce] w-[90%] h-[80px] items-center p-2 rounded-2xl z-10">
                    <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full" />
                    <div className="flex flex-col ml-4 flex-1/4">
                        <h1 className="text-2xl font-bold text-white">{name}</h1>
                        <progress className="w-full h-2 bg-[#595757c8] rounded-full mt-2" value="70" max="100"></progress>
                        <div className="flex justify-between text-sm text-gray-400 mt-1">
                            <span>Level 70</span>
                            <span> 14/30</span>
                        </div>
                    </div>
                    <div className="flex-3/4 flex justify-end"></div>
                </div>
            </div>
            {/* ////////////////////////////////////////////////////////// */}
            <div className="flex-1/6 flex gap-2 m-5">
                <div className="flex-1/2 bg-[#352c523d] rounded-xl flex flex-col gap-2 border border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm">
                    <h1 className="text-lg font-extrabold text-white p-4 w-full border-b border-[#7b5ddf44] tracking-wide bg-[#ffffff08] rounded-t-xl">
                        🎮 Game History
                    </h1>

                    <div className="grid grid-cols-5 justify-items-center text-[#b9b3dfcc]  text-xs font-extrabold uppercase tracking-wider px-4 py-2 border-b border-[#7b5ddf26] bg-[#ffffff04]">
                        <div>Date</div>
                        <div>Opponent</div>
                        <div>Result</div>
                        <div>Score</div>
                        <div>Gold</div>
                    </div>

                    <div className="overflow-y-auto h-[300px] custom-scrollbar px-3 py-2 space-y-2">
                        {history.map((game) => (
                            <div
                                key={game.id}
                                className="grid grid-cols-5 justify-items-center items-center gap-2 text-white p-3 rounded-lg bg-[#ffffff0a] border border-[#7b5ddf22] hover:bg-[#ffffff15] transition-all duration-200 shadow-sm"
                            >
                                <span className=" text-[#ffffffe3] font-semibold text-xs ">{game.date}</span>
                                <span className="text-sm text-[#d6d5d5cd] font-light tracking-tight">{game.opponent}</span>
                                <span
                                    className={`text-sm font-extrabold tracking-wide ${game.result === "Win"
                                            ? "text-green-400"
                                            : game.result === "Loss"
                                                ? "text-red-400"
                                                : "text-yellow-300"
                                        }`}
                                >
                                    {game.result}
                                </span>
                                <span className="text-sm text-white font-bold tracking-wide">{game.score}</span>
                                <span className="text-sm text-cyan-300 font-bold animate-pulse">{game.Goldearned}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1/2 flex flex-col gap-2">
                    <div className="flex-1/2 bg-[#5c45a85c] rounded-lg p-4">
                    </div>
                    <div className="flex-1/2 bg-[#5c45a85c] rounded-lg p-4">
                    </div>
                </div>
            </div>
        </div>
    );
}