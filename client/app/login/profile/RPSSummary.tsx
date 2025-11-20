"use client";
import React from "react";
import { motion } from "framer-motion";
import { Scissors } from "lucide-react";

type Props = {
    user: any;
    games: any[];
};

export default function RPSSummary({ user, games }: Props) {
    const uid = user?.id ?? null;
    const rpsWins = uid ? games.filter((g: any) => g.winner_id === uid).length : 0;
    const rpsDraws = uid ? games.filter((g: any) => g.winner_id === 0).length : 0;
    const rpsLosses = Math.max(0, games.length - rpsWins - rpsDraws);

    const active = rpsWins + rpsLosses; // exclude draws for win %
    const winPct = active > 0 ? Math.round((rpsWins / active) * 100) : 0;

    // Circle geometry
    const size = 160;
    const stroke = 14;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const winOffset = circumference - (winPct / 100) * circumference;

    const statClass = "flex flex-col items-center justify-center w-24 p-3 rounded-lg bg-white/4 border border-white/8 transition-transform duration-300";

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45 }}
            className="relative rounded-2xl p-6 bg-gradient-to-r from-[#160c27]/70 to-[#241635]/60 border border-[#6b3be033] shadow-lg text-white flex items-center gap-6"
        >
            {/* top-right small badge image */}
            <div className="absolute top-6 left-6 " >
                <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-2">
                    <img src="/rps.png" alt="rps" className=" w-10 h-10 opacity-95 rounded-full  p-1 object-cover" />

                    Rock · Paper · Scissors
                </h3>
                <p className="text-gray-400 text-sm">A quick overview for Rock-Paper-Scissors</p>
            </div>

            {/* Header (match chart style) */}
            <div className="flex-1">


                {/* Stats */}
                <div className="mt-2 flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.04 }} className={statClass}>
                        <div className="text-xs text-[#bfb8e7] font-medium">Wins</div>
                        <motion.div
                            key={rpsWins}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="text-xl font-extrabold text-green-300 mt-1"
                        >
                            {rpsWins}
                        </motion.div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.04 }} className={statClass}>
                        <div className="text-xs text-[#bfb8e7] font-medium">Losses</div>
                        <motion.div
                            key={rpsLosses}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="text-xl font-extrabold text-red-400 mt-1"
                        >
                            {rpsLosses}
                        </motion.div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.04 }} className={statClass}>
                        <div className="text-xs text-[#bfb8e7] font-medium">Draws</div>
                        <motion.div
                            key={rpsDraws}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="text-xl font-extrabold text-blue-300 mt-1"
                        >
                            {rpsDraws}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* percentage circle */}
            <div className="w-44 h-44 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                        <defs>
                            <linearGradient id="rpsGradient" x1="0%" x2="100%">
                                <stop offset="0%" stopColor="#7c3aed" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
                            </filter>
                        </defs>

                        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#0f0b14" strokeWidth={stroke} fill="transparent" />
                        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#24132b" strokeWidth={stroke - 2} fill="transparent" />

                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="url(#rpsGradient)"
                            strokeWidth={stroke}
                            fill="transparent"
                            strokeDasharray={`${circumference} ${circumference}`}
                            strokeDashoffset={winOffset}
                            strokeLinecap="round"
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.9s cubic-bezier(.2,.9,.3,1)' }}
                            filter="url(#shadow)"
                        />
                    </svg>

                    <div className="absolute flex flex-col items-center pointer-events-none">
                        <div className="text-xs text-[#d7cfee]">Win Rate</div>
                        <div className="text-2xl font-extrabold text-white">{winPct}%</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
