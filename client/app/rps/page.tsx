"use client"
import { useState } from 'react'

export default function rps() {
    // the data will be fetched from server
    const [ gameStats , setGameStats ] = useState( { // should initialize to db values
        wins: 0,
        losses: 0,
        draws: 0
    } )


    return (
        <div className="flex" >
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

                {/* stats */}
                <div className="flex gap-20 mt-8  px-8 py-8 bg-black/40">
                    
                    <div className="text-center" >
                        <div className="text-2xl font-bold" >WINS</div>
                        <div className="text-4xl font-bold text-green-400" > { gameStats.wins } </div>
                    </div>

                    <div className="text-center" >
                        <div className="text-2xl font-bold" >LOSSES</div>
                        <div className="text-4xl font-bold text-red-400" > { gameStats.losses } </div>
                    </div>

                    <div className="text-center" >
                        <div className="text-2xl font-bold" >DRAWS</div>
                        <div className="text-4xl font-bold text-blue-400" > { gameStats.draws } </div>
                    </div>


                </div>


            </div>
        </div>
    )
}