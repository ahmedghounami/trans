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

            <div className="flex flex-col h-[60vh] overflow-y-auto px-4 py-2 space-y-3 custom-scrollbar">
                {messages.map((m: any) => {
                    const isMe = m.sender_id === me;
                    return (
                        <div
                            key={m.id}
                            className={`max-w-[75%] px-4 py-2 rounded-xl text-sm relative
          ${isMe
                                    ? 'self-end bg-[#3B2F8F] text-white'
                                    : 'self-start bg-[#2B2B2B] text-white'}
        `}
                        >
                            <p className="break-words max-w-[10rem]
            md:max-w-[20rem] lg:max-w-[30rem]">
                                {m.content}
                            </p>
                            <span className="text-[0.65rem] text-gray-400 mt-1 block text-right">
                                {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

        </div>
    );
}