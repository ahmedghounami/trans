"use client";
import { IoChatboxEllipses } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import UserInfo from "./userinfo";

const users = [
    { id: 1, name: "John Doe", lastMessage: "hey", time: "10:30 AM", imageprofile: "/profile.jpg", messagenotseen: 4 },
    { id: 2, name: "Jane Smith", lastMessage: "How's it going?", time: "10:32 AM", imageprofile: "/profile.jpg", messagenotseen: 0 },
    { id: 3, name: "Alice Johnson", lastMessage: "Let's catch up!", time: "10:35 AM", imageprofile: "/profile.jpg", messagenotseen: 0 },
    { id: 4, name: "Bob Brown", lastMessage: "See you later!", time: "10:40 AM", imageprofile: "/profile.jpg", messagenotseen: 1 },
    { id: 5, name: "Charlie White", lastMessage: "Good morning!", time: "10:45 AM", imageprofile: "/profile.jpg", messagenotseen: 3 },
    { id: 6, name: "David Green", lastMessage: "What's up?", time: "10:50 AM", imageprofile: "/profile.jpg", messagenotseen: 0 },
    { id: 7, name: "Eve Black", lastMessage: "Talk later!", time: "10:55 AM", imageprofile: "/profile.jpg", messagenotseen: 2 },
    { id: 8, name: "Frank Blue", lastMessage: "See you soon!", time: "11:00 AM", imageprofile: "/profile.jpg", messagenotseen: 0 },
    { id: 9, name: "Grace Yellow", lastMessage: "Let's meet up!", time: "11:05 AM", imageprofile: "/profile.jpg", messagenotseen: 0 },
    { id: 10, name: "Hank Purple", lastMessage: "Catch you later!", time: "11:10 AM", imageprofile: "/profile.jpg", messagenotseen: 0 },
];



export default function Chat() {
    const [selected, setSelected] = useState(0);
    return (
        <div className="flex flex-row h-full">
            <div className="flex flex-col flex-2/7 border-r-[1] border-[#a0a0a0]">
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-2xl font-bold text-white">Chatbox </h1>
                    <IoChatboxEllipses size={34} className=" " />
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[90%] z-10 pl-10 p-1 rounded-lg border self-center outline-0"
                />
                <CiSearch size={30} className=" mt-[-33] ml-[20] cursor-pointer z-20" />
                <div className="flex h-1 flex-col p-2 gap-2 flex-grow overflow-y-auto">
                    {users.map((user) => (
                        <UserInfo 
                            key={user.id}
                            user={user}
                            setSelected={setSelected}
                        />
                    ))}
                </div>
            </div>
            <div className="flex-1/2 border-r-[1] border-[#a0a0a0]">
                {selected > 0 ? (
                    <h3 className="text-white text-2xl font-bold p-4">
                        selected is {selected}
                    </h3>
                ) : (
                    <h3 className="text-white text-2xl font-bold p-4">
                        Select a user to start chatting
                    </h3>
                )}
            </div>
            <div className=" flex-1/4">
                hello
            </div>
        </div>
    );
}