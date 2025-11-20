"use client";
import { IoNotifications, IoClose, IoCheckmark } from 'react-icons/io5';
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

export default function Topheader() {
  const { user } = useUser();
  const { notifications, unreadCount, markAsRead, deleteNotification } = useNotifications();
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const isOnline = useOnlineStatus();

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

  console.log("User in Topheader:", user);
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
    // Delete the notification when user accepts the game
    deleteNotification(notificationId);
    // Link will navigate to the game
  };
  return (
    <div className="flex w-full justify-between items-center p-4 shadow-md rounded-lg">

      <div className="relative px-0  w-[50%] ml-10 md:ml-0 lg:ml-0  border-b border-[#9b9b9b]">
        <CiSearch
          size={20}
          className="absolute top-1/2 -translate-y-1/2 text-[#9b9b9b] pointer-events-none"
        />
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="text"
          placeholder="Search..."
          // how to delete when the border is focused
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
        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <IoNotifications size={24} className="text-white cursor-pointer hover:text-blue-400 transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-96 max-h-[500px] bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-[420px] custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 px-4">
                    <div className="text-gray-400 text-sm">No notifications yet</div>
                    <p className="text-gray-500 text-xs mt-1">You'll see game invites here</p>
                  </div>
                ) : (
                  <div className="py-2">
                    {notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        className={`relative px-4 py-3 border-b border-gray-800 hover:bg-[#1e1e3e] cursor-pointer transition-colors ${!notification.is_read ? 'bg-[#1a1a3e]' : ''}`}
                        onClick={() => handleNotificationClick(notification.id, notification.is_read)}
                      >
                        <div className="flex items-start gap-3">
                          {/* Sender Profile Picture */}
                          <div className="flex-shrink-0">
                            <AvatarWithPresence userId={notification.sender_id} src={notification.sender_picture || "/profile.png"} sizeClass="w-10 h-10" imgClass="rounded-full border-2 border-purple-600 shadow-md" />
                          </div>

                          {/* Notification Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white font-medium mb-1 line-clamp-2">{notification.message}</p>
                            <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}</p>

                            {/* Action Buttons for Game Invites */}
                            {notification.type === 'game_invite' && (
                              <div className="flex gap-2 mt-2">
                                <Link href={`/games/game?gametype=online&oppid=${notification.sender_id}&invited_player=true`} className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:shadow-lg transition-all" onClick={(e) => { e.stopPropagation(); handleAcceptGameInvite(e, notification.id); }}>
                                  <IoCheckmark size={14} /> Accept
                                </Link>
                                <button onClick={(e) => handleDeleteNotification(e, notification.id)} className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:shadow-lg transition-all">
                                  <IoClose size={14} /> Decline
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Unread Indicator */}
                          {!notification.is_read && (
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                          )}

                          {/* Delete Button */}
                          <button onClick={(e) => handleDeleteNotification(e, notification.id)} className="flex-shrink-0 p-1 text-gray-500 hover:text-red-500 transition-colors" title="Delete notification">
                            <IoClose size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer - See All Link */}
              {notifications.length > 0 && (
                <Link
                  href="/notifications"
                  className="block text-center py-3 border-t border-gray-700 text-sm text-blue-400 hover:text-blue-300 hover:bg-[#1e1e3e] transition-colors"
                  onClick={() => setShowNotifications(false)}
                >
                  See all notifications
                </Link>
              )}
            </div>
          )}
        </div>

        <button className="flex items-center ml-4 cursor-pointer"
          onClick={() => {
            window.location.href = `/profile/${user.id}`;
          }
          }
        >
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/profile.png";
                  }}
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
