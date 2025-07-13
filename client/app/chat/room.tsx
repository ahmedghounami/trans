"use client";
import { useEffect, useState } from 'react';
import socket from '../socket'; // Make sure this is your initialized socket.io-client
import SendMessage from './sendmessages';
import FetchMessages from './fetchmessages';

export default function Room({
    selected,
    me,
}: {
    selected: number;
    me: number;
}) {
    const [messages, setMessages] = useState([]);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        // Join personal room for this user
        socket.emit("join", me); // This ensures the user is in their own room

        const handleIncomingMessage = (msg: any) => {
            // Only refresh messages if it’s relevant
            if (
                (msg.sender_id === selected && msg.receiver_id === me) ||
                (msg.sender_id === me && msg.receiver_id === selected)
            ) {
                console.log("📥 Received live message:", msg);
                setUpdate((u) => u + 1);
            }
        };

        socket.on("new message", handleIncomingMessage);

        return () => {
            socket.off("new message", handleIncomingMessage);
        };
    }, [selected, me]);

    return (
        <div className="flex flex-col h-full justify-between">
            <FetchMessages selected={selected} me={me} messages={messages} setMessages={setMessages} update={update} />
            <SendMessage me={me} selected={selected} />
        </div>
    );
}
