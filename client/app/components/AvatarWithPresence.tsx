"use client";
import Image from "next/image";
import React from "react";
import { usePresence } from "../Context/PresenceContext";

type Props = {
  userId?: number;
  src: string;
  alt?: string;
  sizeClass?: string; // e.g. 'w-12 h-12'
  imgClass?: string;
};

export default function AvatarWithPresence({ userId, src, alt = "User", sizeClass = "w-12 h-12", imgClass = "" }: Props) {
  const { isOnline } = usePresence();
  const online = userId ? isOnline(userId) : false;

  // choose dot placement based on avatar size class (keeps dot inside image for small avatars)
  const dotPosition = (sizeClass && (sizeClass.includes('w-22') || sizeClass.includes('w-24') || sizeClass.includes('w-20'))) ? 'bottom-2 left-2' : 'bottom-0.5 left-0.5';

  return (
    <div className={`relative ${sizeClass}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} rounded-full ${imgClass} object-cover`}
        referrerPolicy="no-referrer"
        onError={(e) => { (e.target as HTMLImageElement).src = '/profile.png' }}
      />
      <span
        className={`absolute ${dotPosition} w-2 h-2 rounded-full ring-2 ring-black/80 ${online ? 'bg-green-400' : 'bg-gray-500'}`}
        title={online ? 'Online' : 'Offline'}
        aria-label={online ? 'online' : 'offline'}
      />
    </div>
  );
}
