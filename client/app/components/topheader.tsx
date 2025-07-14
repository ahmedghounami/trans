import { IoNotifications } from 'react-icons/io5';
import { useUser } from '../Context/UserContext';
import { Skeleton } from '@heroui/skeleton';

export default function Topheader() {
  const { user } = useUser();

  console.log("User in Topheader:", user);

  return (
    <div className="flex justify-end items-center p-4 bg-[#1a1a1a] shadow-md rounded-lg">
      <IoNotifications size={24} className="text-white" />

      <div className="flex flex-col ml-6">
        {!user ? (
          <>
            <Skeleton className="w-32 h-4 mb-2 rounded bg-[#3a3a3a]" /> 
            <Skeleton className="w-20 h-3 rounded bg-[#3a3a3a]" />
          </>
        ) : (
          <>
            <h1 className="text-lg font-semibold text-white">{user.name}</h1>
            <p className="text-sm text-purple-400">{user.balance || '1000'} $</p>
          </>
        )}
      </div>

      {!user ? (
        <Skeleton className="w-12 h-12 rounded-full ml-6 bg-[#3a3a3a]" />
      ) : (
        <img
          src={user.picture || "/back.webp"}
          alt="User"
          className="w-12 h-12 rounded-full ml-6 border border-purple-600 shadow-lg"
          width={48}
          height={48}
        />
      )}
    </div>
  );
}
