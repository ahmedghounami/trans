"use client"
import { useEffect, useState } from 'react';

export default function SendMessage({
    me,
    selected,
    setMessages,
}: {
    me: number;
    selected: number;
    setMessages: (messages: any[]) => void;
}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');
        ws.onopen = () => console.log('✅ WebSocket connected');
        ws.onmessage = (e) => console.log('📨 Message:', e.data);
        ws.onerror = (err) => console.error('WebSocket error:', err);
        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = async () => {
        if (!message.trim() || !socket || socket.readyState !== WebSocket.OPEN) return;

        const payload = {
            content: message,
            sender_id: me,
            receiver_id: selected,
        };

        socket.send(JSON.stringify(payload));
        setMessage('');
        try {
            const res = await fetch(`http://localhost:4000/messages/${selected}/${me}`);
            if (!res.ok) throw new Error('Failed to fetch messages');
            const data = await res.json();
            setMessages(data);
        } catch (err) {
            console.error('❗ Fetch error:', err);
        }

    };

    return (
        <div className="p-4 flex ">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="border p-2 rounded w-full"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        sendMessage();
                    }
                }}
            />
            <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={sendMessage}
            >
                Send
            </button>
        </div>
    );
}
