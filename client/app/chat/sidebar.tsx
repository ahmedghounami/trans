import { CiSearch } from "react-icons/ci";
import { IoChatboxEllipses } from "react-icons/io5";
import Search from "./serach";
import UserInfo from "./userinfo";
import { useEffect, useState } from "react";

export default function Sidebar({
    users,
    selected,
    setSelected,
    isMobile,
    me
}: {
    users: any[];
    selected: number;
    setSelected: (id: number) => void;
    isMobile: boolean;
    me: number;
}) {
    const [value, setValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fectusers = async () => {
            try {
                const res = await fetch('http://localhost:4000/search?search=' + value);
                const data = await res.json();
                console.log("Fetched users:", searchResults);
                setSearchResults(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fectusers();
    }
        , [value]); // Fetch users when value changes

    return (
        <div className={` ${isMobile ? "flex-1" : ""} w-[320px] min-w-[280px] border-r border-[#a0a0a0] flex flex-col`}>
                    <div className="flex justify-between items-center p-4 border-b border-[#a0a0a0]">
                        <h1 className="text-2xl font-bold">Chatbox</h1>
                        <IoChatboxEllipses size={30} />
                    </div>
                    <div className="relative px-4 py-2">
                        <CiSearch
                            size={20}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {value && (
                            <Search searchResults={searchResults} me={me} setSelected={setSelected} value={value} setValue={setValue} />
                        )}

                    </div>
                    <div className="flex-1 overflow-y-auto px-2 pb-4">
                        
                        {users.filter(user => user.id !== me).map(user => (
                            <UserInfo
                                key={user.id}
                                user={user}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        ))}
                    </div>


                    {/* Users List */}
                </div>
    )
}