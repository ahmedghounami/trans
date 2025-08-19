import { Crown } from "lucide-react";
import Games_status from "../home/games_status";

export default function ProfileHeader({ user, games }: { user: any, games: any[] }) {
  const wins = games.filter(game => game.winner_id === user.id).length;
  const draw = games.filter(game => game.winner_id === 0).length;
  const progress = (wins + (draw / 2)) % 10;
  const xp = (wins * 100) + draw * 50;
  const level = Math.floor((wins + (draw / 2)) / 10);
  const goldearned = user.gold;

  return (
    <div className="relative w-full flex flex-col items-center flex-1/6 justify-end">
      {/* Background */}
      <img
        src="/profile.png"
        alt="background"
        className="absolute top-2 left-[2%] w-[96%] h-[85%] object-cover rounded-2xl z-0 bg-cover bg-center shadow-lg"
      />

      {/* Main container */}
      <div className="relative z-10 w-[90%] flex flex-col md:flex-row justify-between items-center rounded-2xl p-2  bg-gradient-to-br from-[#2a2340aa] to-[#1a142ccc] shadow-lg border border-[#7b5ddf44] backdrop-blur-md gap-6">
        
        {/* LEFT SIDE : Profile Info */}
        <div className="flex items-center gap-4 w-full md:w-1/2">
          <img
            src={user.picture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-600 shadow-lg"
          />
          <div className="flex flex-col gap-2 flex-1 ">
            <h2 className="text-lg font-bold text-white">{user.name}</h2>
            
            <div className="flex items-center gap-3 justify-between">
              <span className="bg-[#2121e250] text-white font-bold px-2 py-1 rounded shadow-md border border-white/10 text-xs tracking-wide">
                Level {level}
              </span>
              <span className="text-gray-100 font-semibold text-sm">{xp} XP</span>
            </div>

            {/* Progress bar */}
            <div className="relative w-full h-3 rounded-full overflow-hidden bg-gray-700/50 shadow-inner">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#0303ff] to-[#7537fb] transition-all duration-500"
                style={{ width: `${progress * 10}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE : Game Status */}
        <div className="w-full md:w-1/2 flex justify-end">
          <Games_status userId={user.id} />
        </div>
      </div>
    </div>
  );
}
