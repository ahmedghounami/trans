'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Leftheader from "./leftheader";
import Topheader from "./topheader";

export const LayoutComp = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();

    return (
        <div className="bg-[#00000070]">
            {path != '/' ? (
                <div className="flex h-screen z-0 relative ">
                    <Leftheader />
                    <div className="flex flex-1 flex-col z-10">
                        <Topheader />
                        <main className="flex-1 border-l-[0.5px] border-[#9c9c9c] border-t-[0.1px] rounded-tl-xl ">
                            {children}
                        </main>
                    </div>
                </div>
            ) : (
                <div>
                    {children}
                </div>

            )
            }

        </div>
    )
}

