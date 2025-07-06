"use client";
import { IoChatboxEllipses } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { use, useEffect, useState } from "react";
import UserInfo from "./userinfo";
import FetchMessages from "./fetchmessages";
import Cookies from 'js-cookie';

export default function Chat() {
    const [users, setUsers] = useState([]);
    const [me, setMe] = useState(0);
    useEffect(() => {
        async function fetchme() {
            try {
                const response = await fetch('http://localhost:4000/me', {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched user data:", data);
                setMe(data.id);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchme();
    }
        , []);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersResponse = await fetch('http://localhost:4000/users');
                const usersData = await usersResponse.json();
                setUsers(usersData);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchData();
    }
        , []);

    const [selected, setSelected] = useState(0);
    const [value, setValue] = useState("");

    function sendmessage(conversations: any[]) {
        console.log("Message sent:", value);
        setValue(""); // Clear input after sending
        conversations.find(conversation => conversation.participants.includes(selected))?.messages.push({
            senderId: me.id,
            content: value,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    }
    return (
        <div className="flex flex-row h-full">
            <div className="flex flex-col flex-2/7 border-r-[1] border-[#a0a0a0] ">
                <div className="flex justify-between items-center p-4 border-b-[1] h-18 border-[#a0a0a0]">
                    <h1 className="text-2xl font-bold text-white">Chatbox </h1>
                    <IoChatboxEllipses size={34} className=" " />
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-[90%] z-10 pl-10 p-1 rounded-lg border m-2 self-center outline-0"
                />
                <CiSearch size={30} className=" mt-[-40] ml-[20] cursor-pointer z-20" />
                <div className="flex h-1 flex-col p-2 gap-2 flex-grow overflow-y-auto">
                    {users.filter(user => user.id !== me).map(user => (
                        <UserInfo
                            key={user.id}
                            user={user}
                            setSelected={setSelected}
                            selected={selected}
                        />
                    ))}
                </div>
            </div>
            <div className="flex-1/2 border-r-[1] border-[#a0a0a0]">
                {selected === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <h2 className="text-2xl text-gray-500">Select a user to start chatting</h2>
                    </div>
                ) : (
                    <div className="">
                        <div className="flex items-center mb-4 p-4 h-18 border-b-[1] border-[#a0a0a0]">
                            <img
                                src={users.find(user => user.id === selected)?.picture || "/profile.jpg"}
                                alt="Profile"
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <h2 className="text-xl font-semibold text-white ">
                                {users.find(user => user.id === selected)?.name}
                            </h2>

                        </div>
                        {/* <div className="flex flex-col h-[80vh] overflow-y-auto">
                            hello
                        </div> */}
                        <FetchMessages selected={selected} me={me} />
                    </div>
                )}
            </div>
            <div className=" flex-1/4">
                hello
            </div>
        </div>
    );
}