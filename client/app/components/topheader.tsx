"use client";
import { IoNotifications } from 'react-icons/io5';
import { useUser } from '../Context/UserContext';
import { Skeleton } from '@heroui/skeleton';
import { CiSearch } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Search from '../chat/serach';
import NavSearch from './navsearch';

export default function Topheader() {
  const { user } = useUser();
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
  }
    , [value]); // Fetch users when value changes
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
      <div
        className='flex items-center ' >
        <IoNotifications size={24} className="text-white" />
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
            <img
              src={user.picture || "/back.webp"}
              alt="User"
                className="w-12 h-12 rounded-full ml-6 border border-purple-600 shadow-lg object-cover bg-center"
              width={48}
              height={48}
            />
          )}
        </button>
      </div>

    </div>
  );
}
