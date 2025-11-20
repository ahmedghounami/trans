"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Game = { winner_id: number };

const StatusCard = ({ icon, label, count, delay }: { icon: string; label: string; count: number; delay: number; }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.45, type: "spring" }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}
            className="w-full sm:w-36 md:w-40 lg:w-46 p-4 rounded-2xl shadow-lg border border-[#7b5ddf44] text-white flex flex-col items-start overflow-hidden backdrop-blur-md bg-gradient-to-b from-[#2a2340aa] to-[#1a142ccc] group transition-all duration-300"
        >
            <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                    <img src={icon} alt={`${label} icon`} className="w-12 h-12 md:w-14 md:h-14 opacity-80" />
                </div>
                <div className="ml-3 flex-1">
                    <motion.div key={count} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-xl md:text-2xl font-extrabold text-cyan-300 leading-none">
                        {count}
                    </motion.div>
                    <div className="text-xs md:text-sm text-[#bfb8e7] font-bold tracking-wide mt-1 whitespace-nowrap">
                        {label}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function Games_status({ userId }: { userId: string }) {
    const [games, setGames] = useState(0);
    const [win, setWin] = useState(0);
    const [lost, setLost] = useState(0);
    const [draw, setDraw] = useState(0);

    useEffect(() => {
        const fetchGamesStatus = async () => {
            try {
                const response = await fetch(`http://localhost:4000/games/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data: Game[] = await response.json();

                setGames(data.length);
                setWin(data.filter((game) => game.winner_id === Number(userId)).length);
                setLost(
                    data.filter(
                        (game) => game.winner_id !== Number(userId) && game.winner_id !== 0
                    ).length
                );
                setDraw(games - win - lost);
            } catch (err) {
                console.error("Error:", err);
            }
        };
        fetchGamesStatus();
    }, [userId]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex items-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-stretch">
                <StatusCard icon="/total.png" label="Total Games" count={games} delay={0.05} />
                <StatusCard icon="/win.png" label="Wins" count={win} delay={0.12} />
                <StatusCard icon="/loss.png" label="Losses" count={lost} delay={0.18} />
            </div>
        </motion.div>
    );
}
