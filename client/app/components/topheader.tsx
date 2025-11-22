"use client";
import { IoNotifications, IoClose, IoCheckmark, IoPeople } from 'react-icons/io5';
import { useUser } from '../Context/UserContext';
import { useNotifications } from '../Context/NotificationContext';
import { Skeleton } from '@heroui/skeleton';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Search from '../chat/serach';
import NavSearch from './navsearch';
import AvatarWithPresence from './AvatarWithPresence';
import { formatDistanceToNow } from 'date-fns';
import { useOnlineStatus } from './useOnlineStatus';
import socket from '@/app/socket';

export default function Topheader() {
  const { user } = useUser();
  const { notifications, unreadCount, markAsRead, deleteNotification } = useNotifications();
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [friendNotification, setFriendNotification] = useState(false); // red dot badge
  const notificationRef = useRef<HTMLDivElement>(null);
  const isOnline = useOnlineStatus();

  const friendNotifInitialized = useRef(false);

  // Friend notification socket listener
  useEffect(() => {
    if (!user || friendNotifInitialized.current) return;

    const handleFriendEvent = (data: any) => {
      if (data.fromUserId !== user.id) {
        setFriendNotification(true); // show red dot
      }
    };

    socket.on("friends:request:incoming", handleFriendEvent);  // new request
    socket.on("friends:request:accepted", handleFriendEvent);  // someone accepted
    socket.on("friends:request:refused", handleFriendEvent);   // someone refused
    socket.on("friends:updated", () => setFriendNotification(false)); // reset

    friendNotifInitialized.current = true;

    return () => {
      socket.off("friends:request:incoming", handleFriendEvent);
      socket.off("friends:request:accepted", handleFriendEvent);
      socket.off("friends:request:refused", handleFriendEvent);
      socket.off("friends:updated");
      friendNotifInitialized.current = false;
    };
  }, [user]);

  // Search users
  useEffect(() => {
    const fectusers = async () => {
      try {
        const res = await fetch('http://localhost:4000/search?search=' + value);
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fectusers();
  }, [value]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notificationId: number, isRead: boolean) => {
    if (!isRead) {
      markAsRead(notificationId);
    }
  };

  const handleDeleteNotification = (e: React.MouseEvent, notificationId: number) => {
    e.stopPropagation();
    deleteNotification(notificationId);
  };

  const handleAcceptGameInvite = (e: React.MouseEvent, notificationId: number) => {
    deleteNotification(notificationId);
  };

  return (
    <div className="flex w-full justify-between items-center p-4 shadow-md rounded-lg">

      <div className="relative px-0 w-[50%] ml-10 md:ml-0 lg:ml-0 border-b border-[#9b9b9b]">
        <CiSearch
          size={20}
          className="absolute top-1/2 -translate-y-1/2 text-[#9b9b9b] pointer-events-none"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 text-sm text-[#9b9b9b] focus:outline-none focus:ring-0 border-none"
        />
        {value &&
          (searchResults.length > 0 ? (
            <NavSearch searchResults={searchResults} me={user.id} value={value} setValue={setValue} />
          ) :
            <div className="absolute top-full left-0 w-full bg-[#1a1a1a] rounded-lg shadow-lg mt-2">
              <p className="p-4 text-gray-500">No results found</p>
            </div>
          )}
      </div>

      <div className='flex items-center gap-4'>
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
            <IoNotifications size={24} className="text-white cursor-pointer hover:text-blue-400 transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Friends Button with red dot */}
        <button
          onClick={() => {
            setFriendNotification(false); // reset on click
            window.location.href = "/friends";
          }}
          className="relative ml-4"
        >
          <IoPeople
            size={24}
            className="text-white cursor-pointer hover:text-purple-400 transition-colors"
          />
          {friendNotification && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>

        {/* Profile Button */}
        <button className="flex items-center ml-4 cursor-pointer" onClick={() => window.location.href = `/profile/${user.id}`}>
          <div className="flex flex-col ml-6">
            {!user ? (
              <>
                <Skeleton className="w-32 h-4 mb-2 rounded bg-[#3a3a3a]" />
                <Skeleton className="w-20 h-3 rounded bg-[#3a3a3a]" />
              </>
            ) : (
              <>
                <h1 className="text-lg font-semibold text-white">{user.name}</h1>
                <p className="text-sm text-purple-400">{user.gold} $</p>
              </>
            )}
          </div>
          {!user ? (
            <Skeleton className="w-12 h-12 rounded-full ml-6 bg-[#3a3a3a]" />
          ) : (
            <div className="ml-6">
              <div className="relative w-12 h-12">
                <img
                  src={user?.picture || "/profile.png"}
                  alt="User"
                  className="w-12 h-12 rounded-full border border-purple-600 shadow-lg object-cover bg-center"
                  width={48}
                  height={48}
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/profile.png"; }}
                />
                <span
                  className={`absolute bottom-0.5 left-0.5 w-2 h-2 animate-pulse rounded-full ring-2 ring-[#0a0a0a] ${isOnline ? 'bg-green-400' : 'bg-gray-600'}`}
                  title={isOnline ? 'Online' : 'Offline'}
                  aria-label={isOnline ? 'online' : 'offline'}
                />
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
