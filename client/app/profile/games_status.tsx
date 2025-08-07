import { useEffect, useState } from "react";

type Game = {
    winner_id: number;
};

const StatusCard = ({
    icon,
    label,
    count,
}: {
    icon: string;
    label: string;
    count: number;
}) => (
    <div className="relative  w-30 sm:w-36 p-4 rounded-2xl shadow-lg border border-[#7b5ddf44]
     text-white flex flex-col items-center overflow-hidden group hover:shadow-[0_0_25px_#7b5ddf99] 
     transition-all duration-300 ease-in-out">
        <div className="absolute -top-6 right-0  group-hover:opacity-50 transition-opacity duration-300">
            <img src={icon} alt={`${label} icon`} className="w-full opacity-70 h-full" />
        </div>
        <img src={icon} alt={`${label} icon`} className="w-12 h-14 z-10 mb-2 opacity-0" />
        <span className="text-2xl font-bold mt-1 z-10">{count}</span>
        <span className="text-sm text-[#bfb8e7] z-10 font-bold tracking-wide">{label}</span>
    </div>
);

export default function Games_status({ userId }: { userId: string }) {
    const [games, setGames] = useState(0);
    const [win, setWin] = useState(0);
    const [lost, setLost] = useState(0);

    useEffect(() => {
        const fetchGamesStatus = async () => {
            try {
                const response = await fetch(`http://localhost:4000/games/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch");

                const data: Game[] = await response.json();
                setGames(data.length);
                setWin(data.filter(game => game.winner_id === Number(userId)).length);
                setLost(data.filter(game => game.winner_id !== Number(userId) && game.winner_id !== 0).length);
            } catch (err) {
                console.error("Error:", err);
            }
        };

        fetchGamesStatus();
    }, [userId]);

    return (
        <div className="w-full flex justify-between items-center bg-[#352c523d] px-4 sm:px-10 gap-4 sm:gap-6 backdrop-blur-sm flex-wrap">
            <StatusCard icon="/total.png" label="Total Games" count={games} />
            <StatusCard icon="/win.png" label="Wins" count={win} />
            <StatusCard icon="/loss.png" label="Losses" count={lost} />
        </div>
    );
}
