"use client";

import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Room from "./room";

import { useUser } from "../Context/UserContext";
import Sidebar from "./sidebar";

export default function Chat() {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile); // Update isMobile on resize
        return () => window.removeEventListener("resize", checkMobile); // Cleanup listener on unmount
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch('http://localhost:4000/users');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    const { user } = useUser();

    
    const me = user?.id;
    const showSidebar = !isMobile || (isMobile && selected === 0);
    const showChat = !isMobile || (isMobile && selected !== 0);

    return (
        <div className="flex h-full w-full text-white overflow-hidden">
            {showSidebar && (
                <Sidebar
                    users={users}
                    selected={selected}
                    setSelected={setSelected}
                    isMobile={isMobile}
                   
                    me={me}
                />
            )}
            {showChat && (
                <div className="flex-1 flex flex-col">
                    {selected === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <h2 className="text-xl text-gray-500">Select a user to start chatting</h2>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between  items-center border-b border-[#a0a0a0] px-4 py-3 gap-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={users.find(user => user.id === selected)?.picture || "/profile.jpg"}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <h2 className="text-xl font-semibold">
                                        {users.find(user => user.id === selected)?.name}
                                    </h2>
                                </div>
                                {isMobile && (
                                    <button
                                        className="text-gray-400 hover:text-white transition-colors"
                                        onClick={() => setSelected(0)}
                                    >
                                        <FaArrowRight size={24} />
                                    </button>
                                )}
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <Room selected={selected} me={me} />
                            </div>
                        </>
                    )}
                </div>
            )
            }
        </div >
    );
}
