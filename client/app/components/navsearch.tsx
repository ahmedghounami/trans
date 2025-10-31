import { FaUserPlus } from 'react-icons/fa';

export default function NavSearch({ searchResults, me, value, setValue }: {
    searchResults: { id: number; name: string; picture?: string }[];
    me: number;
    value: string;
    setValue: (value: string) => void;
}
) {
    return (
        <div className="absolute left-[5%] top-12 w-[90%] z-20 max-h-[300px] overflow-y-auto bg-[#020007c5] border border-[#3d008d] shadow-xl rounded-xl px-2 py-3 space-y-2 custom-scroll">
            {searchResults
                .filter((user) => user.id !== me)
                .map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between gap-3 px-4 py-2 rounded-lg bg-purple-800/30 transition-colors"
                    >
                        <div
                            className="flex items-center gap-3 cursor-pointer min-w-0"
                            onClick={() => {
                                setValue("");
                                window.location.href = `/profile/${user.id}`;
                            }}
                        >
                            <img
                                src={user.picture || "/profile.jpg"}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-purple-600 shadow-md object-cover"
                            />
                            <span className="text-white font-bold text-base tracking-wide truncate">
                                {user.name}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <button
                                aria-label={`Add ${user.name} as friend`}
                                className="ml-2 flex items-center gap-2 px-3 py-1 rounded-md text-sm font-semibold text-white shadow-md bg-gradient-to-r from-purple-700 via-blue-700 to-black border border-purple-900 hover:from-purple-500 hover:via-blue-600 hover:to-black hover:scale-105 transition-all duration-150"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // TODO: wire up friend request API
                                    alert(`Friend request sent to ${user.name}`);
                                }}
                            >
                                <FaUserPlus className="text-lg" />
                            </button>
                        </div>
                    </div>
                ))}

            {value && searchResults.length === 0 && (
                <div className="text-center text-gray-500 text-sm">No users found</div>
            )}
        </div>

    );
}