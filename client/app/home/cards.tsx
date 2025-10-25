import React from 'react';
import { Trophy, Flame, Coins, Star, Crown, BarChart3 } from 'lucide-react';
import { Calendar, TrendingUp, Clock } from "lucide-react";


const StatCard = ({ icon: Icon, label, value, trend, color = "from-purple-500 to-blue-600", subtitle }) => {
    return (
        <div
            className="relative bg-gradient-to-br from-black/50 to-purple-900/20 backdrop-blur-md rounded-xl p-4 h-28 w-full 
            border border-purple-500/20 shadow-lg shadow-purple-500/10 transition-all duration-300 
            hover:scale-105 hover:border-purple-400/40 "
        >
            <div className="relative flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-purple-200 text-xs font-medium uppercase tracking-wide mb-1 truncate">
                        {label}
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-white text-xl font-bold">{value}</span>
                        {trend && (
                            <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${trend > 0
                                    ? "text-green-400 bg-green-400/10"
                                    : "text-red-400 bg-red-400/10"
                                    }`}
                            >
                                {trend > 0 ? "+" : ""}
                                {trend}
                            </span>
                        )}
                    </div>
                    {subtitle && <p className="text-purple-300 text-xs mt-1 truncate">{subtitle}</p>}
                </div>
            </div>
        </div>
    );
};

export default function PingPongAchievements({ games, user }) {
    const gameCount = games.length;
    const totalGold = user.gold || 0;
    const winrate = gameCount > 0 ? Math.round((games.filter((g) => g.winner_id === user.id).length / gameCount) * 100) : 0;

    const streak = (() => {
        let maxStreak = 0, current = 0;
        for (let i = 0; i < games.length; i++) {
            if (games[i].winner_id === user.id) current++;
            else {
                maxStreak = Math.max(maxStreak, current);
                current = 0;
            }
        }
        return Math.max(maxStreak, current);
    })();

    const recentForm = () => {
        const recent = games.slice(-5);
        const wins = recent.filter((g) => g.winner_id === user.id).length;
        return recent.length > 0 ? Math.round((wins / recent.length) * 100) : 0;
    };

    const skillRating = () => {
        const base = 1000;
        return Math.max(800,
            Math.round(base + (winrate - 50) * 10 + streak * 25 + Math.min(gameCount * 5, 200))
        );
    };

    const favoriteTimeSlot = () => {
        if (games.length === 0) return "N/A";
        const slots = { morning: 0, afternoon: 0, evening: 0, night: 0 };
        games.forEach((g) => {
            const h = new Date(g.created_at || Date.now()).getHours();
            if (h >= 6 && h < 12) slots.morning++;
            else if (h >= 12 && h < 17) slots.afternoon++;
            else if (h >= 17 && h < 22) slots.evening++;
            else slots.night++;
        });
        const maxSlot = Object.keys(slots).reduce((a, b) => (slots[a] > slots[b] ? a : b));
        return maxSlot.charAt(0).toUpperCase() + maxSlot.slice(1);
    };
    const wins = games.filter(game => game.winner_id === user.id).length;
    const draw = games.filter(game => game.winner_id === 0).length;
    const progress = (wins + (draw / 2)) % 10; // Assuming 10 wins + 5 draws = 1 level
    const xp = (wins * 100) + draw * 50; // Assuming each win gives 100 XP and each draw gives 50 XP
    const level = Math.floor((wins + (draw / 2)) / 10); // 10 wins or 5 draws = 1 level
    return (
        <div className="flex-1/2 flex  flex-col gap-3 h-full justify-around border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm rounded-lg p-6 border bg-[#2b24423d]">
            {/* Stats */}
            <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">Performance Analytics</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <StatCard icon={Calendar} label="Games Played" value={gameCount} subtitle="Total matches" color="from-indigo-500 to-blue-600" />
                <StatCard icon={TrendingUp} label="Recent Form" value={`${recentForm()}%`} subtitle="Last 5 games"
                    trend={recentForm() > winrate ? +(recentForm() - winrate) : -(winrate - recentForm())}
                    color="from-emerald-500 to-teal-600"
                />
                <StatCard icon={Star} label="Skill Rating" value={skillRating()} subtitle="Performance score" color="from-violet-500 to-purple-600" />
                <StatCard icon={Clock} label="Peak Hours" value={favoriteTimeSlot()} subtitle="Most active time" color="from-blue-400 to-indigo-600" />
            </div>
            {/* Level and XP */}
            < div className="flex flex-col  justify-center p-2">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
                        <Crown className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-white">Level & XP</h2>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-300 mt-1">
                    <div className="flex flex-col items-start gap-1">
                        <span className="bg-[#2121e250]
                     text-white font-bold px-2 py-1 rounded shadow-md 
                     border border-white/10 text-sm tracking-wide">
                            Level {level}
                        </span>
                        <span className="text-xs text-gray-400">Level Progress</span>
                    </div>

                    <span className="text-gray-100 font-semibold">{xp} XP</span>
                </div>

                {/* Progress bar */}
                <div className="relative w-full h-3 mt-3 rounded-full overflow-hidden bg-gray-700/50 shadow-inner">
                    <div
                        className="absolute top-0 left-0 h-full rounded-full 
               bg-gradient-to-r from-[#0303ff] to-[#7537fb]
               transition-all duration-500"
                        style={{ width: `${progress * 10}%` }}
                    ></div>
                </div>
            </div>


        </div>
    );
}


