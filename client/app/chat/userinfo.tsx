export default function UserInfo({ user, setSelected }: {
    user: {
        id: number;
        name: string;
        lastMessage: string;
        time: string;
        imageprofile: string;
        messagenotseen: number;
    };
    isSelected: boolean;
    setSelected: (id: number) => void;
}

) {
    const selectedhandler = (user: {
        id: number;
        name: string;
        lastMessage: string;
        time: string;
        imageprofile: string;
        messagenotseen: number;
    }, setSelected: (id: number) => void) => {
        const id = user.id;
        console.log("selected user is", user);
        setSelected(id);
        user.messagenotseen = 0; // Reset the unseen messages count when selected
        console.log("user after selection", user);


    };
    return (
        <div key={user.id} className=" flex p-1 items-center hover:bg-[#a9a8a847] rounded-lg transition-colors duration-200 cursor-pointer"
            onClick={() => selectedhandler(user, setSelected)}
        >
            <img
                src={user.imageprofile}
                alt={user.name}
                className="w-10 h-10 rounded-full m-2"
            />
            <div className="flelx flex-col flex-1">
                <div className="flex justify-between">
                    <h3 className="text-white font-semibold">{user.name}</h3>
                    <span className="font-medium text-[#8d9cb2] text-sm">{user.time}</span>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-400">{user.lastMessage}</p>

                    {user.messagenotseen > 0 && (
                        <span className="ml-2 bg-blue-500 text-white rounded-full p-1 px-2 text-xs">
                            {user.messagenotseen}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}