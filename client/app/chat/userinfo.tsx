import { useEffect, useState } from "react";

export default function UserInfo({
  user,
  setSelected,
  selected,
  me,
  messages
}: {
  user: {
    id: number;
    name: string;
    picture: string;
    me: number;
    messages: any[];
  };
  selected: number;
  setSelected: (id: number) => void;
}) {
  const [lastmessage, setLastMessage] = useState("");

  const selectedhandler = () => {
    console.log("Selected user is:", user);
    setSelected(user.id);
  };

  useEffect(() => {
    // fetch last message between me and user 
    const fetchLastMessage = async () => {
      try {
        const res = await fetch(`http://localhost:4000/lastmessage/${me}/${user.id}`);
        const data = await res.json();
        setLastMessage(data.content);
        console.log("Last message fetched:", data);
      } catch (error) {
        console.error("Error fetching last message:", error);
      }
    };
    fetchLastMessage();
  }
    , [messages, me]); // Fetch last message when user or me changes


  return (
    <div
      key={user.id}
      className={`flex p-1 items-center hover:bg-[#a9a8a847] rounded-lg transition-colors duration-200 cursor-pointer ${selected === user.id ? 'bg-[#a9a8a847]' : ''}`}
      onClick={selectedhandler}
    >
      <img
        src={user.picture}
        alt={user.name}
        className="w-10 h-10 rounded-full m-2"
      />
      <div className="flex flex-col">
        <h3 className="text-white font-semibold">{user.name}</h3>
        <p className="text-gray-400 text-sm">{lastmessage || "No messages yet"}</p>
      </div>

    </div>
  );
}
