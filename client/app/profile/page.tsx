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
        Goldearned: 200
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
        Goldearned: 250
    },
    {
        id: 6,
        date: "2023-10-06",
        opponent: "@opponent6",
        result: "Loss",
        score: "0-1",
        Goldearned: 30
    },
    {
        id: 7,
        date: "2023-10-07",
        opponent: "@opponent7",
        result: "Win",
        score: "2-1",
        Goldearned: 120
    },
    {
        id: 8,
        date: "2023-10-08",
        opponent: "@opponent8",
        result: "Loss",
        score: "1-3",
        Goldearned: 60
    },
    {
        id: 9,
        date: "2023-10-09",
        opponent: "@opponent9",
        result: "Win",
        score: "4-2",
        Goldearned: 180
    },
    {
        id: 10,
        date: "2023-10-10",
        opponent: "@opponent10",
        result: "Draw",
        score: "0-0",
        Goldearned: 90
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
                <div className="flex-1/2 bg-[#5c45a85c] rounded-lg flex flex-col gap-2">
                    <h1 className="text-lg font-bold text-white p-4 w-full border-b-1">Game history</h1>
                    <div className="grid grid-cols-5 justify-items-center text-[#a9a3a3d0] ">
                        <div className="font-bold">Date</div>
                        <div className="font-bold">Opponent</div>
                        <div className="font-bold">Result</div>
                        <div className="font-bold">Score</div>
                        <div className="font-bold">Gold Earned</div>
                    </div>
                    <div className="overflow-y-auto h-[300px]">
                        {history.map((game) => (
                            <div key={game.id} className="grid grid-cols-5 justify-items-center text-white p-2 m-2 rounded-[10] bg-[#80808036]">
                                <span>{game.date}</span>
                                <span>{game.opponent}</span>
                                <span>{game.result}</span>
                                <span>{game.score}</span>
                                <span>{game.Goldearned}</span>
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