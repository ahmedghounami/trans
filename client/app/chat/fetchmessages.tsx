import { useEffect, useRef } from 'react';

export default function FetchMessages({
    selected,
    me,
    setMessages,
    messages,
    update,
}: {
    selected: number;
    me: number;
    setMessages: (messages: any[]) => void;
    messages: any[];
    update: number;
}) {
    const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the end of the messages container
    const fetchMessages = async () => {
        try {
            const res = await fetch(`http://localhost:4000/messages/${selected}/${me}`);
            if (!res.ok) throw new Error('Failed to fetch messages');
            const data = await res.json();
            setMessages(data);
        } catch (err) {
            console.error('❗ Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [update, selected, me]); // Fetch messages when update changes or selected/me change

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col">
            <div className="flex justify-center items-center p-4">
                <p className="text-gray-500 text-sm">{messages.length} messages</p>
            </div>

            <div className="flex flex-col h-[60vh] overflow-y-scroll">
                {messages.map((m: any) => (
                    <div
                        key={m.id}
                        className={`flex justify-${m.sender_id === me ? 'end' : 'start'} p-2`}
                    >
                        <p
                            className={`${
                                m.sender_id === me ? 'bg-white' : 'bg-blue-500'
                            } text-black p-2 rounded-lg m-2`}
                        >
                            <strong>{m.sender_id}:</strong> {m.content}
                        </p>
                    </div>
                ))}
                {/* Invisible div to scroll to */}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}