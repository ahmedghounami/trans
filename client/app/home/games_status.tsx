"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Game = { winner_id: number };

const StatusCard = ({
    icon,
    label,
    count,
    delay,
}: {
    icon: string;
    label: string;
    count: number;
    delay: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(123,93,223,0.5)",
                rotate: 1,
            }}
            className="relative w-6 sm:w-30 p-1 rounded-2xl shadow-lg border border-[#7b5ddf44] 
      text-white flex flex-col items-center overflow-hidden 
      backdrop-blur-md bg-gradient-to-b from-[#2a2340aa] to-[#1a142ccc]
      group transition-all duration-300 ease-in-out"
        >
            {/* Glow background icon */}
            <div className="absolute -top-6 right-0 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <img src={icon} alt={`${label} icon`} className="w-20 h-20" />
            </div>

            {/* Foreground icon */}
            <motion.img
                src={icon}
                alt={`${label} icon`}
                className="h-1 z-10 mb-2 drop-shadow-lg"
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 200 }}
            />

            {/* Animated count */}
            <motion.span
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-extrabold mt-1 z-10 text-cyan-300"
            >
                {count}
            </motion.span>

            {/* Label */}
            <span className="text-sm text-[#bfb8e7] z-10 font-bold tracking-wide">
                {label}
            </span>
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex justify-end  items-center gap-4 flex-wrap rounded-xl "
        >
            <StatusCard icon="/total.png" label="Total Games" count={games} delay={0.1} />
            <StatusCard icon="/win.png" label="Wins" count={win} delay={0.2} />
            <StatusCard icon="/loss.png" label="Losses" count={lost} delay={0.3} />
        </motion.div>
    );
}
