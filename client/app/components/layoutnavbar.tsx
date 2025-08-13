'use client';
import React, { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Leftheader from "./leftheader";
import Topheader from "./topheader";
import { GiHamburgerMenu } from "react-icons/gi";

export const LayoutComp = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setIsOpen(!mobile); // show sidebar by default on desktop
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const shouldShowLayout = path !== '/' && path !== '/login';

    return (
        <div className="h-screen bg-[#00000070] relative">
            {shouldShowLayout ? (
                <div className="flex h-full">
                    {isMobile ? (
                        <>
                            <button
                                className="absolute top-5 left-2 z-50 p-2 bg-black/60 rounded-full text-white md:hidden"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <GiHamburgerMenu size={28} />
                            </button>
                            {isOpen && (
                                <div className="absolute top-0 left-0 z-40 w-15 h-full bg-[#343434ca] shadow-lg transition-transform duration-300">
                                    <Leftheader />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-20 bg-[#0000004d]">
                            <Leftheader />
                        </div>
                    )}
                    <div className="flex flex-1 flex-col z-10 bg-[#0000004d]">
                        <Topheader />
                        <main className="flex-1 lg:border-l-[0.5px] md:border-l-[0.5px] border-[#9c9c9c] border-t-[0.1px] rounded-tl-xl overflow-auto bg-[#0e052472]
                        [&::-webkit-scrollbar-thumb]:bg-blue-400
               [&::-webkit-scrollbar-thumb]:rounded-full
               [&::-webkit-scrollbar]:w-2
                        ">
                            {children}
                        </main>
                    </div>
                </div>
            ) : (
                <div>{children}</div>
            )}
        </div>
    );
};
