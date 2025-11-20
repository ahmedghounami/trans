"use client"
import { useState, useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import Cookies from 'js-cookie'

interface gameStatsType {
    wins: number;
    losses: number;
    draws: number;
}

export default function rps(  ) {
    const { user, loading } = useUser()
    
    // the data will be fetched from server
    const [ gameStats , setGameStats ] = useState<gameStatsType>( { // should initialize to db values
        wins: 0,
        losses: 0,
        draws: 0
    } )

    // roomId is for the current room
    // joinedRoomId is for the joined room
    const [ roomId , setRoomId ] = useState<string>('')
    // const [ joinedRoomId , setJoinedRoomId ] = useState<string>('')
    const [ result , setResult ] = useState<string>('')
    const [ selectedChoice , setSelectedChoice ] = useState<number | null>(null)

    // for keeping the same socket
    const [ ws , setWs ] = useState<WebSocket | null>(null)

    // Function to fetch stats from database
    const fetchStats = async () => {
        if (user?.id) {
            try {
                const res = await fetch('http://localhost:4000/me', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                })
                const data = await res.json()
                if (data.rps_wins !== undefined) {
                    setGameStats({
                        wins: data.rps_wins || 0,
                        losses: data.rps_losses || 0,
                        draws: data.rps_draws || 0,
                    })
                }
            } catch (error) {
                console.error('Error fetching RPS stats:', error)
            }
        }
    }

    // Fetch initial stats from database
    useEffect(() => {
        fetchStats()
    }, [user])

   

    useEffect( () => {
        if (!user?.id) return // Don't connect until user is loaded

        // connect to rps socket
        const ws: WebSocket = new WebSocket ('ws://localhost:8090') //possible memory leak

        ws.onopen = () => {
            console.log("connected to rps socket")
            setWs(ws)
            
            // Send userId to server
            ws.send(JSON.stringify({
                type: 'set_user',
                userId: user.id
            }))
        }
        ws.onmessage = (msg) => {
            console.log(`received ${msg.data}`)

            if ( msg.data === "1" ) {
                setResult("WIN")
            }
            else if ( msg.data === "-1" ) {
                setResult("LOSE")
            }
            else if ( msg.data === "0" ) {
                setResult("DRAW")
            }

            // Refetch stats from database after each game to ensure accuracy
            setTimeout(() => {
                fetchStats()
            }, 500)

        }
        // generate 12 character alpha-numeric code
        const chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789'
        let result: string = ''

        for ( let i: number = 0 ; i < 12 ; i++ ) {
            const randomIndex: number = Math.floor( Math.random() * chars.length )
            result += chars.charAt(randomIndex)
        }
        setRoomId( result )

        return () => {
            ws.close()
        }
    } , [user])

    // for when the user clicks on join
    const handleJoinRoom = () => {
        if ( roomId.trim() && ws && ws.readyState == WebSocket.OPEN ) {
            
            ws.send ( JSON.stringify( {
                type: 'create_or_join_room',
                roomId: roomId,
                userId: user?.id
                
            } ) )

            console.log ("create_or_join_room away!")

        }
    }

    const handleChoice = ( choice: number ) => {
        if ( ws && ws.readyState == WebSocket.OPEN ) {
            setSelectedChoice(choice)
            ws.send( JSON.stringify(
                {
                    type: 'rps',
                    roomId: roomId,
                    choice: choice,
                    userId: user?.id
                }
            ) )

            console.log( "rps away!" )
        }
    }


    return (
        <div className="flex flex-col" >
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-2xl">Loading...</div>
                </div>
            ) : (
            <>
            <div className="flex flex-col items-center pt-10">
                <div className="w-full p-8 rounded-lg">
                    <h1 className="text-6xl font-bold text-white mb-4 text-center w-full">Rocky Papery Scissory :)</h1>
                    <p className="text-xl text-gray-300 text-center w-full mb-8">Enjoy</p>
                </div>

                {/* buttons */}
                <div className="flex gap-4 justify-center">
                    <button 
                        className={`px-8 py-4 rounded-lg text-2-xl cursor-pointer border transition-all duration-200 ${
                            selectedChoice === 0 
                                ? 'bg-amber-800 border-amber-600 scale-105 shadow-lg' 
                                : 'hover:bg-amber-800'
                        }`}
                        onClick={ () => handleChoice(0) }
                    >
                        ROCK
                    </button>
                    <button 
                        className={`px-8 py-4 rounded-lg text-2-xl cursor-pointer border transition-all duration-200 ${
                            selectedChoice === 1 
                                ? 'bg-amber-200 text-black border-amber-400 scale-105 shadow-lg' 
                                : 'hover:bg-amber-200 hover:text-black'
                        }`}
                        onClick={ () => handleChoice(1) }
                    >
                        PAPER
                    </button>
                    <button 
                        className={`px-8 py-4 rounded-lg text-2-xl cursor-pointer border transition-all duration-200 ${
                            selectedChoice === 2 
                                ? 'bg-slate-600 text-black border-slate-400 scale-105 shadow-lg' 
                                : 'hover:bg-slate-600 hover:text-black'
                        }`}
                        onClick={ () => handleChoice(2) }
                    >
                        SCISSOR
                    </button>

                    
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

            {/* result */}
            { result &&
                (
                    <div className="mt-10 flex justify-center" >
                        <div className={`px-8 py-4 rounded-xl text-3xl font-bold shadow-xl transition-all duration-300
                            ${result === 'WIN' ? 'bg-green-700 text-white' : ''}
                            ${result === 'LOSE' ? 'bg-red-700 text-white' : ''}
                            ${result === 'DRAW' ? 'bg-gray-700 text-white' : ''}
                            `} >
                                {result === 'WIN' && 'YOU WIN! :)'}
                                {result === 'LOSE' && 'YOU LOSE :('}
                                {result === 'DRAW' && 'ITS A DRAW!'}

                        </div>
                    </div>
                )
            }
            </>
            )}
        </div>
    )
}