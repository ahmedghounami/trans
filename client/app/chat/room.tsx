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
    const [update, setUpdate] = useState(0);

    return (
        <div className="flex flex-col h-full justify-between">
            <FetchMessages selected={selected} me={me}  messages={messages} setMessages={setMessages} update={update} />
            <SendMessage me={me} selected={selected}  setUpdate={setUpdate} update={update} />
        </div>
    );
}
