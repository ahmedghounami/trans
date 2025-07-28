export default function ProfileHeader({ profileImage, name }: { profileImage: string, name: string }) {
    return (
        <div className="flex-1/6 relative flex flex-col justify-end items-center">

            <img src="/online.jpeg" alt="background"
                className="absolute top-2 left-[2%] self-center w-[96%] h-[85%] object-cover rounded-2xl z-0"
            />
            
            <div className="absolute top-[77%] w-[90%] bg-[rgba(0,0,0,0.75)] flex p-2 rounded-2xl h-[25%]">
                <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full" />
                <div className="flex flex-col ml-4 flex-1/4">
                    <h1 className="text-2xl font-bold text-white">{name}</h1>
                    <progress className="w-full h-2 bg-[#595757c8] rounded-full mt-2" value="70" max="100"></progress>
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                        <span>Level 70</span>
                        <span> 14/30</span>
                    </div>
                </div>
                <div className="flex-3/4 flex justify-end"></div>
            </div>
        </div>
    );
}