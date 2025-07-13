"use client";

import { IoChatboxEllipses } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import UserInfo from "./userinfo";
import Room from "./room";

export default function Chat() {
    const [users, setUsers] = useState([]);
    const [me, setMe] = useState(0);
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
        async function fetchMe() {
            try {
                const res = await fetch('http://localhost:4000/me', {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setMe(data.id);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchMe();
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
    const showSidebar = !isMobile || (isMobile && selected === 0);
    const showChat = !isMobile || (isMobile && selected !== 0);
    return (
        <div className="flex h-full w-full text-white overflow-hidden">
            {/* Sidebar */}
            {showSidebar && (
                <div className={` ${isMobile ? "flex-1" : ""} w-[320px] min-w-[280px] border-r border-[#a0a0a0] flex flex-col`}>
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-[#a0a0a0]">
                        <h1 className="text-2xl font-bold">Chatbox</h1>
                        <IoChatboxEllipses size={30} />
                    </div>

                    {/* Search */}
                    <div className="relative px-4 py-2">
                        <CiSearch
                            size={20}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
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
