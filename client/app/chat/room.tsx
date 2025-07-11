"use client";
import SendMessage from './sendmessages';
import FetchMessages from './fetchmessages';
import { useState } from 'react';

export default function Room({
    selected,
    me,
}: {
    selected: number;
    me: number;
}) {
    const [messages, setMessages] = useState([]);

    return (
        <div className="flex flex-col h-full justify-between">
            <FetchMessages selected={selected} me={me}  messages={messages} setMessages={setMessages} />
            <SendMessage me={me} selected={selected} setMessages={setMessages} />
        </div>
    );
}
