
import { IoNotifications } from 'react-icons/io5';
import { useUser } from '../Context/UserContext';
import { Skeleton } from '@heroui/skeleton';

export default function Topheader() {

  const { user } = useUser();

  console.log("User in Leftheader:", user);
  return (
    <div className="flex justify-end p-2 items-center">
      <IoNotifications size={24} />
      <div className="flex flex-col  ml-10">
        {!user ? (
          <Skeleton className="w-32 h-6 mb-2" />
        ) : (
          <h1 className="text-lg font-semibold">{user.name}</h1>
        )}
        <p className="text-sm text-gray-500">1000 $</p>
      </div>
      <img
        src="/back.webp"
        alt="Logo"
        className="w-12 h-12 rounded-full ml-4"
        width={48}
        height={48}
      />
    </div>
  );
}
