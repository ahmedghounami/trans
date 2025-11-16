import { FaUserPlus } from 'react-icons/fa';
import AvatarWithPresence from './AvatarWithPresence';

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
                            <AvatarWithPresence userId={user.id} src={user.picture || "/profile.png"} alt={user.name} sizeClass="w-10 h-10" imgClass="border border-purple-500" />
                            <span className="text-white font-bold text-base tracking-wide truncate">
                                {user.name}
                            </span>
                        </div>
                    </div>
                ))}

            {value && searchResults.length === 0 && (
                <div className="text-center text-gray-500 text-sm">No users found</div>
            )}
        </div>

    );
}