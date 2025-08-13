export default function Search({ searchResults, me, setSelected, value, setValue }: {
    searchResults: { id: number; name: string; picture?: string }[];
    me: number;
    setSelected: (id: number) => void;
    value: string;
    setValue: (value: string) => void;
}
) {
    return (
        <div className="absolute  left-[5%] top-12 w-[90%] z-20 max-h-[300px] overflow-y-auto bg-[#1a1a1a] border border-[#3d008d] shadow-xl rounded-xl px-2 py-3 space-y-2 custom-scroll">
            {searchResults
                .filter((user) => user.id !== me)
                .map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#2a2a2a] hover:bg-purple-800/30 transition-colors cursor-pointer"
                        onClick={() => {
                            setSelected(user.id);
                            setValue("");
                        }}
                    >
                        <img
                            src={user.picture || "/profile.jpg"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-purple-600 shadow-md object-cover"
                        />
                        <span className="text-white font-medium text-sm tracking-wide">
                            {user.name}
                        </span>
                    </div>
                ))}

            {value && searchResults.length === 0 && (
                <div className="text-center text-gray-500 text-sm">No users found</div>
            )}
        </div>

    );
}