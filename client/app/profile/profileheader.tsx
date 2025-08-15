import Games_status from "../home/games_status";

export default function ProfileHeader({ user, games }: { user: any, games: any[] }) {

    const wins = games.filter(game => game.winner_id === user.id).length;
    const level = Math.floor(wins / 10);
    const progress = wins % 10; // 0 to 9 wins inside this level
    const xp = wins * 100; // Assuming each win gives 100 XP
    const goldearned = user.gold;

    console.log("User data in ProfileHeader: -", user.picture);

    return (
        <div className="flex-1/6 relative flex flex-col justify-end items-center">
            <img
                src="/profile.png"
                alt="background"
                className="absolute top-2 left-[2%] w-[96%] h-[85%] object-cover rounded-2xl z-0 bg-cover bg-center shadow-lg"
            />
            <div className="mb-6 w-[90%] flex rounded-2xl p-4 items-center bg-gradient-to-br from-[#2a2340aa] to-[#1a142ccc] shadow-lg border border-[#7b5ddf44] backdrop-blur-md z-10">
                <img
                    src={user.picture}
                    alt="Profile"
                    className="w-22 h-22 rounded-full object-cover border border-purple-600 shrink-0" />
                <div className="flex flex-col ml-4 flex-1/4">
                    <div className="flex items-center gap-2 mt-1">
                        <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                        <div className="flex items-center gap-1">
                            <span className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-sm font-semibold px-2 rounded border-1">
                                Level {level}
                            </span>
                            <span className="text-[#e89454] border-yellow-500/30 font-bold px-2 animate-pulse">
                                {goldearned} Gold
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                        <span>Level progress</span>
                        <span className="text-gray-300 font-bold">{xp} XP</span>
                    </div>
                    <progress
                        className="w-full h-2 bg-[#595757c8] rounded-full mt-2"
                        value={progress * 10}
                        max="100"
                    ></progress>
                </div>
                <Games_status userId={user.id} className="flex-3/4 flex justify-end" />
            </div>
        </div>
    );
}