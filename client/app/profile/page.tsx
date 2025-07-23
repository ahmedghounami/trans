"use client";
import { useUser } from "../Context/UserContext";

export default function Profile() {
    const { user, loading } = useUser();
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
    }
    const profileImage = user?.picture;
    const name = user?.name;

    return (
        <div className="flex flex-col h-full ">
            <div className="flex-1 relative flex flex-col justify-end items-center">

                <img src="/online.jpeg" alt="background"
                    className="absolute inset-[2%] self-center w-[96%] h-[85%] object-cover rounded-2xl z-0"
                />

                <div className="flex bg-[#000000ce] w-[90%] h-[80px] items-center p-2 rounded-2xl z-10">
                    {/* <h1 className="text-2xl font-bold">Ahmed</h1> */}
                    <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full" />
                    <div className="flex flex-col ml-4">
                        <h1 className="text-2xl font-bold text-white">{name}</h1>
                    </div>
                </div>
            </div>
            <div className="flex-1/6 flex gap-2 m-2">
                <div className="flex-1/2 bg-[#5c45a85c] rounded-lg">
                </div>
                <div className="flex-1/2 flex flex-col gap-2">
                    <div className="flex-1/2 bg-[#5c45a85c] rounded-lg p-4">
                    </div>
                    <div className="flex-1/2 bg-[#5c45a85c] rounded-lg p-4">
                    </div>
                </div>
            </div>
        </div>
    );
}