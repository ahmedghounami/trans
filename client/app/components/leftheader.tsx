"use client";

import { GoHomeFill } from "react-icons/go";
import { IoChatbubbleSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Leftheader() {
    const pathname = usePathname();

    const navItems = [
        { href: "/home", icon: <GoHomeFill size={26} />, label: "Home" },
        { href: "/chat", icon: <IoChatbubbleSharp size={26} />, label: "Chat" },
        { href: "/shop", icon: <FaShoppingCart size={26} />, label: "Shop" },
        { href: "/settings", icon: <IoMdSettings size={26} />, label: "Settings" },
    ];

    return (
        <div className="h-screen flex flex-col p-2 justify-between items-center text-white shadow-xl">
            {/* Logo */}
            <div className="mt-4">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="rounded-full border border-gray-600 shadow-md"
                    width={64}
                    height={64}
                />
            </div>

            {/* Navigation Icons */}
            <nav className="flex flex-col gap-2 items-center">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-label={item.label}
                            className={`group relative p-3 rounded-lg flex items-center justify-center transition-transform duration-300 ease-in-out
                ${isActive ? "text-blue-500 scale-110" : "text-gray-400 hover:text-blue-400 hover:scale-110"}
              `}
                        >
                            <div className="flex flex-col justify-center items-center">
                                <div className="group-hover:bg-blue-500/10 rounded-full p-2 transition-all duration-300 ease-in-out cursor-pointer">
                                    {item.icon}
                                </div>
                                <span className={`text-xs  ${isActive ? "opacity-100" : "opacity-0"} :  group-hover:opacity-100 transition duration-300`}>
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <button
                aria-label="Logout"
                className="flex flex-col items-center text-gray-400 hover:text-red-500 transition duration-300 group mb-6"
                onClick={() => {
                    console.log("Logout clicked");
                }}
            >
                <div className="group-hover:bg-red-500/10 p-2 rounded-full transition duration-300">
                    <IoLogOut size={28} />
                </div>
                <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition duration-300">
                    Logout
                </span>
            </button>
        </div>
    );
}
