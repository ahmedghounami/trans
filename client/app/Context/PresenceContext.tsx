"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import socket from "../socket";

type PresenceContextType = {
  onlineUsers: Set<number>;
  isOnline: (id?: number) => boolean;
};

const PresenceContext = createContext<PresenceContextType | undefined>(undefined);

export function PresenceProvider({ children }: { children: ReactNode }) {
  const [onlineUsers, setOnlineUsers] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Request current online users
    socket.emit('request_online_users');

    const handleOnlineUsers = (list: number[]) => {
      setOnlineUsers(new Set(list));
    };

    const handleUserPresence = ({ userId, status }: { userId: number; status: string }) => {
      setOnlineUsers(prev => {
        const copy = new Set(prev);
        if (status === 'online') copy.add(userId);
        else copy.delete(userId);
        return copy;
      });
    };

    socket.on('online_users', handleOnlineUsers);
    socket.on('user_presence', handleUserPresence);

    return () => {
      socket.off('online_users', handleOnlineUsers);
      socket.off('user_presence', handleUserPresence);
    };
  }, []);

  const isOnline = (id?: number) => {
    if (!id) return false;
    return onlineUsers.has(id);
  };

  return (
    <PresenceContext.Provider value={{ onlineUsers, isOnline }}>
      {children}
    </PresenceContext.Provider>
  );
}

export function usePresence() {
  const ctx = useContext(PresenceContext);
  if (!ctx) throw new Error('usePresence must be used within PresenceProvider');
  return ctx;
}
