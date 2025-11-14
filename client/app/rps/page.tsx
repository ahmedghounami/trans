"use client"
import { useState, useEffect } from 'react'

interface gameStatsType {
    wins: number;
    losses: number;
    draws: number;
}

export default function rps(  ) {
    // the data will be fetched from server
    const [ gameStats , setGameStats ] = useState<gameStatsType>( { // should initialize to db values
        wins: 0,
        losses: 0,
        draws: 0
    } )

    // roomId is for the current room
    // joinedRoomId is for the joined room
    const [ roomId , setRoomId ] = useState<string>('')
    const [ joinedRoomId , setJoinedRoomId ] = useState<string>('')

    // for keeping the same socket
    const [ ws , setWs ] = useState<WebSocket | null>(null)

   

    useEffect( () => {
        // connect to rps socket
        const ws: WebSocket = new WebSocket ('ws://localhost:8090') //possible memory leak

        ws.onopen = () => {
            console.log("connected to rps socket")
            setWs(ws)
        }
        // generate 12 character alpha-numeric code
        const chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789'
        let result: string = ''

        for ( let i: number = 0 ; i < 12 ; i++ ) {
            const randomIndex: number = Math.floor( Math.random() * chars.length )
            result += chars.charAt(randomIndex)
        }
        setRoomId( result )
    } , [] )

    // for when the user clicks on join
    const handleJoinRoom = () => {
        if ( roomId.trim() && ws && ws.readyState == WebSocket.OPEN ) {
            
            ws.send ( JSON.stringify( {
                type: 'create_or_join_room',
                roomId: roomId,
                
            } ) )

            console.log ("create_or_join_room away!")

        }
    }

    const handleChoice = ( choice: number ) => {
        if ( ws && ws.readyState == WebSocket.OPEN ) {
            ws.send( JSON.stringify(
                {
                    type: 'rps',
                    roomId: roomId,
                    choice: choice
                }
            ) )

            console.log( "rps away!" )
        }
    }


    return (
        <div className="flex flex-col" >
            <div className="flex flex-col items-center pt-10">
                <div className="w-full p-8 rounded-lg">
                    <h1 className="text-6xl font-bold text-white mb-4 text-center w-full">Rocky Papery Scissory :)</h1>
                    <p className="text-xl text-gray-300 text-center w-full mb-8">Enjoy</p>
                </div>

                {/* buttons */}
                <div className="flex gap-4 justify-center">
                    <button className="px-8 py-4 rounded-lg text-2-xl hover:bg-amber-800
                    cursor-pointer border" onClick={ () => handleChoice(0) } >ROCK</button>
                    <button className="px-8 py-4 rounded-lg text-2-xl hover:bg-amber-200
                    cursor-pointer border hover:text-black" onClick={ () => handleChoice(1) } >PAPER</button>
                    <button className="px-8 py-4 rounded-lg text-2-xl hover:bg-slate-600
                    cursor-pointer border hover:text-black" onClick={ () => handleChoice(2) } >SCISSOR</button>

                    
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

            <div className="flex flex-col items-center justify-center mt-8 gap-2">
                <input 
                    type="text" 
                    value={roomId}
                    className="px-4 py-2 rounded border"
                    onChange={ (e) => setRoomId( e.target.value.toLowerCase() ) }
                />
                <button
                 className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                 onClick={handleJoinRoom}
                 >
                    Join
                </button>
            </div>
        </div>
    )
}