import { useEffect, useState } from "react";

export default function FetchMessages({
    selected, me }: {
    selected: number;
    me: number;
}) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:4000/messages/${selected}/${me}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("Fetching messages for conversation ID:", selected);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched messages:", data);
                setMessages(data);
                return data;
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        fetchData();
    }
        , [selected]);
    return <div className="flex flex-col overflow-y-auto h-full">
        {messages.map((message: { id: number; sender_id: number; receiver_id: number; content: string; created_at: string; }) => (
            <div key={message.id} className={`flex justify-${message.sender_id === me ? 'end' : 'start'} p-2`}>
                <p className={`${message.sender_id === me ? 'bg-amber-500' : 'bg-blue-500'} text-white p-2 rounded-lg m-2`}>
                    <strong>{message.sender_id}:</strong> {message.content}
                    </p>
                </div>
        ))}
    </div>;
}