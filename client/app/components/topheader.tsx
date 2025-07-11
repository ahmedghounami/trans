
import {IoNotifications} from 'react-icons/io5';
export default function Topheader() {
  return (
    <div className="flex justify-end p-2 items-center">
      <IoNotifications size={24} />
      <div className="flex flex-col  ml-10">
        <h1 className="text-lg font-semibold">Welcome, User!</h1>
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
