"use client";
import { useEffect, useState } from "react";
import socket from "../socket";
import SendMessage from "./sendmessages";
import FetchMessages from "./fetchmessages";

type Message = {
    id: number;
    content: string;
    sender_id: number;
    receiver_id: number;
    status: boolean;
    created_at: string;
};

export default function Room({
    selected,
    me,
}: {
    selected: number;
    me: number;
}) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.emit("join", me);

        const handleIncomingMessage = (msg: Message) => {
            if (msg.sender_id === selected && msg.receiver_id === me) {
                console.log("📥 Received live message:", msg);
                setMessages((prev) => [...prev, msg]);
            }
        };

        socket.on("new message", handleIncomingMessage);

        return () => {
            socket.off("new message", handleIncomingMessage);
        };
    }, [selected, me]);

    // 🔁 Retry sending unsent messages
    useEffect(() => {
        const resend = () => {
            if (!navigator.onLine || !socket.connected) return;

            setMessages((prev) => {
                const updated = [...prev];
                updated.forEach((msg, i) => {
                    if (!msg.status && msg.sender_id === me) {
                        socket.emit("chat message", { ...msg, status: true });
                        updated[i] = { ...msg, status: true };
                        console.log("📤 Retried message:", msg);
                    }
                });
                return updated;
            });
        };

        window.addEventListener("online", resend);
        socket.on("connect", resend);

        return () => {
            window.removeEventListener("online", resend);
            socket.off("connect", resend);
        };
    }, [navigator.onLine, socket, me]);

    return (
        <div className="flex flex-col h-full justify-between">
            <FetchMessages
                selected={selected}
                me={me}
                messages={messages}
                setMessages={setMessages}
                update={0}
            />
            <SendMessage me={me} selected={selected} setMessages={setMessages} />
        </div>
    );
}
