export default function UserInfo({
    user,
    setSelected,
    selected,
  }: {
    user: {
      id: number;
      name: string;
      picture: string;
    };
    selected: number;
    setSelected: (id: number) => void;
  }) {
    const selectedhandler = () => {
      console.log("Selected user is:", user);
      setSelected(user.id);
    };
  
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
        </div>
      </div>
    );
  }
  