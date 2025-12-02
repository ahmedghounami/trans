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
  // compute numeric width from sizeClass (e.g. 'w-12') to derive dot size
  const widthMatch = sizeClass.match(/w-(\d+)/);
  const numericWidth = widthMatch ? Number(widthMatch[1]) : 12;

  // choose dot size based on avatar width
  const dotSizeClass = numericWidth >= 20 ? 'w-3 h-3' : 'w-2 h-2';

  // wrapper uses inline-block and overflow-visible so the status dot can sit outside the avatar cleanly
  return (
    <div className={`relative inline-block overflow-visible ${sizeClass}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} rounded-full ${imgClass} object-cover`}
        referrerPolicy="no-referrer"
        onError={(e) => { (e.target as HTMLImageElement).src = '/profile.png' }}
      />
      <span
        className={`absolute ${dotSizeClass} rounded-full animate-pulse ring-2 ring-black/80 ${online ? 'bg-green-400' : 'bg-gray-500'}`}
        title={online ? 'Online' : 'Offline'}
        aria-label={online ? 'online' : 'offline'}
        style={{ right: 2, bottom: 2, transform: 'translate(20%, 20%)' }}
      />
    </div>
  );
}
