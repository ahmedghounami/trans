// File: pages/index.tsx

import Link from "next/link";


export default function LandingPage() {
  return (

    <div className="flex flex-col justify-center">
      <div className="">
        <img
          src="/logo.png"
          alt="Logo"
          className="m-[1%] rounded-full border border-gray-600 shadow-md w-[90px] h-[60px]"
          width={150}
          height={150}
        />
      </div>
      <div className=" flex flex-col text-center justify-center mt-[6%] items-center">
        <h1 className="text-6xl font-bold  text-white mt-10">
          Ping Pong, Anytime, <br></br> Anywhere
        </h1>
        <h1 
          className="text-1xl font-semibold text-gray-400 mt-10 mb-4"
        >
          Play solo, with friends, or jump into online <br></br> tournaments — right now!
        </h1>
        <Link
          className="bg-[#fffdfd] text-[#0e066e]  text-center px-3 py-2 rounded-[15px] font-extrabold hover:bg-[#0e066e] hover:text-white transition-colors duration-300"
          href="/home"
        >
          Get Started
        </Link>
      </div>


    </div>

  );
}