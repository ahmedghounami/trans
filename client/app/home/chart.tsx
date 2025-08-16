import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import Loading from '../components/loading';
import { get } from 'http';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CustomTooltip = ({ active, payload, label }) =>
    active && payload?.length ? (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 shadow-lg">
            <p className="text-white font-medium">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} style={{ color: entry.color }} className="text-sm">
                    {entry.dataKey}: {entry.value}
                </p>
            ))}
        </div>
    ) : null;

const SimplePerformanceChart = ({ games = [], user }) => {
    if (!games|| !user) return <Loading />;

    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - (6 - i)); // this ensures we start from today and go back 6 days
        console.log("Generating data for  today :", date.getDate());
        return {
            day: daysOfWeek[date.getDay()],
            date: date.toISOString().split('T')[0],
            wins: 0,
            losses: 0
        };
    });

    games.forEach(({ date, winner_id }) => {
        const dayData = last7Days.find(d => d.date === new Date(date).toISOString().split('T')[0]);
        if (dayData) {
            if (winner_id === user.id) dayData.wins++;
            else if (winner_id !== 0) dayData.losses++;
        }
    });
    const wins = games.filter(game => game.winner_id === user.id).length;
    const progress = wins % 10; // 0 to 9 wins inside this level
    const xp = wins * 100; // Assuming each win gives 100 XP
    const level = Math.floor(wins / 10);
    return (
        <div className="h-full flex flex-col justify-between flex-1/2 border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm rounded-lg p-6 border bg-[#2b24423d]">
            {/* Header */}
            <div className="mb-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Performance Chart
                </h3>
                <p className="text-gray-400 text-sm">Weekly wins vs losses</p>
            </div>

            {/* Chart */}
            <div className="flex-1/2">
                <ResponsiveContainer>
                    <LineChart data={last7Days} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="wins" stroke="#0ea5e9" strokeWidth={6} dot />
                        <Line type="monotone" dataKey="losses" stroke="#8b5cf6" strokeWidth={6} dot />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
                {[
                    { label: 'Wins', color: 'bg-blue-400' },
                    { label: 'Losses', color: 'bg-purple-400' }
                ].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${color} rounded-full`} />
                        <span className="text-gray-300 text-sm">{label}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-300 mt-1">
                <div className="flex flex-col items-start gap-1">
                    <span className="bg-[#2121e250]
                     text-white font-bold px-3 py-1 rounded shadow-md 
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
    );
};

export default SimplePerformanceChart;
