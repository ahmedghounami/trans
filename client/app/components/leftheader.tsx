import { GoHomeFill } from "react-icons/go";
import { IoChatbubbleSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";

export default function Leftheader() {
    return (
        <div className="h-full flex flex-col justify-center gap-10 items-center">
            <img
                src="/logo.png"
                alt="Logo"
                className="w-16 h-16 rounded-full mb-4"
                width={64}
                height={64}
            />
            <div className="flex-1 flex flex-col gap-10 justify-center ">
                <Link href="/" className="">
                    <GoHomeFill size={32} />
                </Link>
                <Link href="/chat" className="">
                <IoChatbubbleSharp size={32} />
                </Link>
                <Link href="/" className="">
                <FaShoppingCart size={32} />
                </Link>
                <Link href="/" className="">
                <IoMdSettings size={32} />
                </Link>
            </div>
            <div className="mt-auto mb-2">
                <IoLogOut size={36} />
            </div>

        </div>
    );
}