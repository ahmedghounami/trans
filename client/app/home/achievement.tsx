import React from 'react';
import { Trophy, Flame, Coins, Star, Target, Award, Zap, Crown, BarChart3 } from 'lucide-react';
import { Calendar, TrendingUp, Clock } from "lucide-react"

const AchievementCard = ({ icon: Icon, name, progress, total, completed = false, tier = "bronze" }) => {
    const progressPercentage = total ? (progress / total) * 100 : 100;
    if (completed)
        tier = 'gold'; // Force gold tier if completed
    const getTierStyle = (tier) => {
        switch (tier) {
            case 'gold': return 'border-yellow-500/50 shadow-lg shadow-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-purple-500/10';
            case 'silver': return 'border-purple-400/50 shadow-lg shadow-purple-400/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10';
            default: return 'border-purple-500/30 shadow-lg shadow-purple-500/10 bg-gradient-to-br from-purple-800/20 to-purple-900/20';
        }
    };

    const getIconColor = (tier) => {
        switch (tier) {
            case 'gold': return 'from-yellow-800/30 to-yellow-500/40';
            case 'silver': return 'from-purple-400 to-blue-500';
            default: return 'from-purple-500 to-pink-500';
        }
    };

    return (
        <div className={`relative backdrop-blur-md rounded-xl px-10 py-5 border transition-all duration-300 hover:scale-105 hover:shadow-xl ${getTierStyle(tier)} ${completed ? 'animate-pulse-slow' : ''}`}>
            {completed && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">✓</span>
                </div>
            )}

            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${getIconColor(tier)} shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-sm leading-tight">{name}</h3>
            </div>

            {total ? (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-purple-200">{progress}/{total}</span>
                        <span className="text-xs font-semibold text-white">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="relative w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div
                            className={` h-full rounded-full transition-all duration-1000 ease-out ${completed ? 'bg-gradient-to-r from-green-400 to-emerald-500' : `bg-gradient-to-r ${getIconColor(tier)}`}`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    </div>
                </div>
            ) : (
                <div className="text-green-400 font-bold text-xs uppercase tracking-wide">Mastered!</div>
            )}
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, trend, color = "from-purple-500 to-pink-500", subtitle }) => {
    return (
        <div className="relative bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 shadow-lg shadow-purple-500/10 transition-all duration-300 hover:scale-102 hover:border-purple-400/40">
            <div className="bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl" />

            <div className="relative flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-purple-200 text-xs font-medium uppercase tracking-wide mb-1">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-white text-xl font-bold">{value}</span>
                        {trend && (
                            <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend > 0 ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"}`}
                            >
                                {trend > 0 ? "+" : ""}
                                {trend}
                            </span>
                        )}
                    </div>
                    {subtitle && <p className="text-purple-300 text-xs mt-1">{subtitle}</p>}
                </div>
            </div>
        </div>
    )
}

export default function PingPongAchievements({ games, user }: { games: any[], user: any }) {


    const gameCount = games.length;
    const totalGold = user.gold || 0;
    const winrate = gameCount > 0 ? Math.round((games.filter(game => game.winner_id === user.id).length / gameCount) * 100) : 0;


    const streak = (() => {
        let maxStreak = 0
        let currentStreak = 0
        for (let i = 0; i < games.length; i++) {
            if (games[i].winner_id === user.id) {
                currentStreak++
            } else {
                maxStreak = Math.max(maxStreak, currentStreak)
                currentStreak = 0
            }
        }
        return Math.max(maxStreak, currentStreak)
    })()

    const recentForm = () => {
        const recentGames = games.slice(-5)
        const recentWins = recentGames.filter((game) => game.winner_id === user.id).length
        return recentGames.length > 0 ? Math.round((recentWins / recentGames.length) * 100) : 0
    }

    const skillRating = () => {
        const baseRating = 1000
        const winBonus = (winrate - 50) * 10
        const streakBonus = streak * 25
        const experienceBonus = Math.min(gameCount * 5, 200)
        return Math.max(800, Math.round(baseRating + winBonus + streakBonus + experienceBonus))
    }

    const favoriteTimeSlot = () => {
        if (games.length === 0) return "Not enough data"

        const timeSlots = { morning: 0, afternoon: 0, evening: 0, night: 0 }

        games.forEach((game) => {
            const hour = new Date(game.created_at || Date.now()).getHours()
            if (hour >= 6 && hour < 12) timeSlots.morning++
            else if (hour >= 12 && hour < 17) timeSlots.afternoon++
            else if (hour >= 17 && hour < 22) timeSlots.evening++
            else timeSlots.night++
        })

        const maxSlot = Object.keys(timeSlots).reduce((a, b) => (timeSlots[a] > timeSlots[b] ? a : b))

        return maxSlot.charAt(0).toUpperCase() + maxSlot.slice(1)
    }

    return (
        <div className="flex flex-col gap-4 w-full justify-between">
            {/* Stats Section */}

            <div className="flex items-center gap-3 mb-4 pt-4">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">Performance Analytics</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <StatCard
                    icon={Calendar}
                    label="Games Played"
                    value={gameCount}
                    subtitle="Total matches"
                    color="from-indigo-500 to-blue-600"
                />

                <StatCard
                    icon={TrendingUp}
                    label="Recent Form"
                    value={`${recentForm()}%`}
                    subtitle="Last 5 games"
                    trend={recentForm() > winrate ? +Math.abs(recentForm() - winrate) : -Math.abs(recentForm() - winrate)}
                    color="from-emerald-500 to-teal-600"
                />

                <StatCard
                    icon={Star}
                    label="Skill Rating"
                    value={skillRating()}
                    subtitle="Performance score"
                    color="from-violet-500 to-purple-600"
                />

                <StatCard
                    icon={Clock}
                    label="Peak Hours"
                    value={favoriteTimeSlot()}
                    subtitle="Most active time"
                    color="from-amber-500 to-purple-600"
                />
            </div>

            {/* Achievements Section */}
            <div className="flex  items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-lg shadow-lg">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">Achievements</h2>

            </div>

            <div className="flex justify-around">
                <AchievementCard
                    icon={Trophy}
                    name="First Victory"
                    completed={gameCount > 0}
                // tier="gold"
                />

                <AchievementCard
                    icon={Flame}
                    name="Streak Master"
                    progress={streak}
                    total={10}
                    completed={streak >= 10}
                />
                <AchievementCard
                    icon={Coins}
                    name="Gold Master"
                    progress={totalGold}
                    total={1000}
                    tier="bronze"
                    completed={totalGold >= 1000}
                />
                <AchievementCard
                    icon={Crown}
                    name="Champion"
                    progress={1}
                    total={1}
                    completed={true}
                />
            </div>


            {/* Mini Progress Section */}



        </div>

    );
}








