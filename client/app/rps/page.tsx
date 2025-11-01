"use client"

export default function rps() {
    return (
        <div className="min-h-screen flex flex-col items-center pt-10">
            <div className="w-full p-8 rounded-lg">
                <h1 className="text-6xl font-bold text-white mb-4 text-center w-full">Rocky Papery Scissory :)</h1>
                <p className="text-xl text-gray-300 text-center w-full mb-8">Enjoy</p>
            </div>

            {/* buttons */}
            <div className="flex gap-4 justify-center">
                <button className="px-8 py-4 rounded-lg text-2-xl hover:bg-amber-800
                cursor-pointer border" >ROCK</button>
                <button className="px-8 py-4 rounded-lg text-2-xl hover:bg-amber-200
                cursor-pointer border hover:text-black" >PAPER</button>
                <button className="px-8 py-4 rounded-lg text-2-xl hover:bg-slate-600
                cursor-pointer border hover:text-black" >SCISSOR</button>

                
            </div>

        </div>
    )
}