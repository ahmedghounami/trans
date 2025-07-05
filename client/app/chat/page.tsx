"use client";
import { IoChatboxEllipses } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { use, useEffect, useState } from "react";
import UserInfo from "./userinfo";

// const users = [
//     { id: 2, name: "Jane Smith", imageprofile: "/back", },
//     { id: 3, name: "Alice Johnson", imageprofile: "/back", },
//     { id: 4, name: "Bob Brown", imageprofile: "/back", },
//     { id: 5, name: "Charlie White", imageprofile: "/back", },
//     { id: 6, name: "David Green", imageprofile: "/back", },
//     { id: 7, name: "Eve Black", imageprofile: "/back", },
//     { id: 8, name: "Frank Blue", imageprofile: "/back", },
//     { id: 9, name: "Grace Yellow", imageprofile: "/back", },
//     { id: 10, name: "Hank Purple", imageprofile: "/back", },
// ];

// const userstalkingwith = [
//     { id: 2, name: "Jane Smith", lastMessage: "Let's meet tomorrow!", time: "11:15 AM", imageprofile: "/back.webp", messagenotseen: 2 },
//     { id: 3, name: "Alice Johnson", lastMessage: "See you at the party!", time: "11:10 AM", imageprofile: "/back.webp", messagenotseen: 1 },
// ];
// const conversations = [
//     {
//         id: 1, participants: [1, 2], messages: [
//             { senderId: 1, content: "Hey, how are you?", timestamp: "10:30 AM" },
//             { senderId: 2, content: "I'm good, thanks! You?", timestamp: "10:31 AM" },
//             { senderId: 1, content: "Doing well! Just working on some projects.", timestamp: "10:32 AM" },
//             { senderId: 2, content: "Sounds great! Let's catch up later.", timestamp: "10:33 AM" }
//         ]
//     },
//     {
//         id: 2, participants: [1, 3], messages: [
//             { senderId: 1, content: "Hey Alice, how's it going?", timestamp: "10:35 AM" },
//             { senderId: 3, content: "Hi John! I'm doing well, thanks!", timestamp: "10:36 AM" },
//             { senderId: 1, content: "Let's catch up sometime.", timestamp: "10:37 AM" }
//         ]
//     },
//     {
//         id: 3, participants: [2, 4], messages: [
//             { senderId: 2, content: "Hey Bob, see you later!", timestamp: "10:40 AM" },
//             { senderId: 4, content: "Sure, take care!", timestamp: "10:41 AM" },
//             { senderId: 2, content: "You too!", timestamp: "10:42 AM" }
//         ]
//     },
//     {
//         id: 4, participants: [3, 5], messages: [
//             { senderId: 3, content: "Good morning Charlie!", timestamp: "10:45 AM" },
//             { senderId: 5, content: "Good morning Alice!", timestamp: "10:46 AM" },
//             { senderId: 3, content: "How's your day going?", timestamp: "10:47 AM" },
//             { senderId: 5, content: "Pretty good! Just started working.", timestamp: "10:48 AM" }
//         ]
//     },
//     {
//         id: 5, participants: [4, 6], messages: [
//             { senderId: 4, content: "Hey David, what's up?", timestamp: "10:50 AM" },
//             { senderId: 6, content: "Not much, just relaxing.", timestamp: "10:51 AM" },
//             { senderId: 4, content: "Sounds good! Let's hang out later.", timestamp: "10:52 AM" }
//         ]
//     },
//     {
//         id: 6, participants: [5, 7], messages: [
//             { senderId: 5, content: "Hi Eve, talk later?", timestamp: "10:55 AM" },
//             { senderId: 7, content: "Sure Charlie! Talk soon.", timestamp: "10:56 AM" }
//         ]
//     },
//     {
//         id: 7, participants: [6, 8], messages: [
//             { senderId: 6, content: "Frank, see you soon!", timestamp: "11:00 AM" },
//             { senderId: 8, content: "Yes David! Looking forward to it.", timestamp: "11:01 AM" }
//         ]
//     },
//     {
//         id: 8, participants: [7, 9], messages: [
//             { senderId: 7, content: "Grace, let's meet up!", timestamp: "11:05 AM" },
//             { senderId: 9, content: "Sure Eve! When are you free?", timestamp: "11:06 AM" }
//         ]
//     },
//     {
//         id: 9, participants: [8, 10], messages: [
//             { senderId: 8, content: "Hank, catch you later!", timestamp: "11:10 AM" },
//             { senderId: 10, content: "See you Frank! Take care.", timestamp: "11:11 AM" }
//         ]
//     },
//     {
//         id: 10, participants: [9, 1], messages: [
//             { senderId: 9, content: "John, let's catch up!", timestamp: "11.15 AM" },
//             { senderId: 1, content: "Sure Grace! When are you free?", timestamp: "11.16 AM" }
//         ]
//     },
// ];


// const me = {
//     id: 1,
//     name: "You",
//     lastMessage: "Hello, how are you?",
//     time: "11:20 AM",
//     imageprofile: "/back",
//     messagenotseen: 0
// };

export default function Chat() {
    const [users, setUsers] = useState([]);
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
                    {users.map((user) => (
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
                        {/* <div className="flex flex-col gap-4 h-[70vh] overflow-y-auto p-2">
                            {conversations
                                .find(conversation => conversation.participants.includes(selected))
                                ?.messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.senderId === me.id ? "justify-end" : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-2 rounded-lg ${message.senderId === me.id
                                                ? "bg-[#0808f098] text-white"
                                                : "bg-[#707ff754] text-white border-[#313038] border-[1]"
                                                } shadow-md`}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                            <span className="text-xs text-gray-400 mt-1 block">
                                                {message.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="flex justify-between items-center mt-10">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-[90%] ml-1 p-2 rounded-lg border outline-none"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        sendmessage(conversations);

                                    }
                                }}
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mx-1 rounded-lg hover:bg-blue-600 transition-colors"
                                onClick={() => {
                                    sendmessage(conversations);
                                }}
                            >
                                Send
                            </button>
                        </div> */}

                    </div>
                )}
            </div>
            <div className=" flex-1/4">
                hello
            </div>
        </div>
    );
}