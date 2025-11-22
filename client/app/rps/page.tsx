"use client"
import { useState, useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import Cookies from 'js-cookie'
import { io, Socket } from 'socket.io-client'

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
    const [ waiting , setWaiting ] = useState<boolean>(false)
    const [ roomStatus , setRoomStatus ] = useState<string>('')
    const [ joined , setJoined ] = useState<boolean>(false)

    // for keeping the same socket
    const [ socket , setSocket ] = useState<Socket | null>(null)

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

        // connect to rps socket using Socket.IO
        const socket = io('http://localhost:4000') //possible memory leak

        socket.on('connect', () => {
            console.log("connected to rps socket")
            setSocket(socket)
            
            // Send userId to server
            socket.emit('set_user', {
                userId: user.id
            })
        })

        socket.on('rps_result', (result: number) => {
            console.log(`received result: ${result}`)

            if ( result === 1 ) {
                setResult("WIN")
            }
            else if ( result === -1 ) {
                setResult("LOSE")
            }
            else if ( result === 0 ) {
                setResult("DRAW")
            }

            // Refetch stats from database after each game to ensure accuracy
            setTimeout(() => {
                fetchStats()
            }, 500)

            setWaiting(false)
        })

        socket.on('rps_error', (error: string) => {
            alert(error)
        })

        socket.on('player_joined', () => {
            setRoomStatus('Player joined! 🎮')
            setTimeout(() => setRoomStatus(''), 3000)
            setJoined(true)
        })

        socket.on('player_left', () => {
            setRoomStatus('Player left 😢')
            setTimeout(() => setRoomStatus(''), 3000)
            setJoined(false)
            setWaiting(false)
            setSelectedChoice(null)
        })

        // generate 12 character alpha-numeric code
        const chars: string = 'abcdefghijklmnopqrstuvwxyz0123456789'
        let result: string = ''

        for ( let i: number = 0 ; i < 12 ; i++ ) {
            const randomIndex: number = Math.floor( Math.random() * chars.length )
            result += chars.charAt(randomIndex)
        }
        setRoomId( result )

        return () => {
            socket.disconnect()
        }
    } , [user])

    // for when the user clicks on join
    const handleJoinRoom = () => {
        if ( roomId.trim() && socket && socket.connected ) {
            
            socket.emit('create_or_join_room', {
                roomId: roomId,
                userId: user?.id
            })

            setJoined(true)
            console.log ("create_or_join_room away!")

        }
    }

    const handleChoice = ( choice: number ) => {
        if ( socket && socket.connected ) {
            setSelectedChoice(choice)
            setWaiting(true)
            socket.emit('rps', {
                roomId: roomId,
                choice: choice,
                userId: user?.id
            })

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
            <div className="flex flex-col items-center pt-4 sm:pt-6 md:pt-10 px-4">
                <div className="w-full p-4 sm:p-6 md:p-8 rounded-lg">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 text-center w-full">Rocky Papery Scissory :)</h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center w-full mb-4 sm:mb-6 md:mb-8">Enjoy</p>
                </div>

                {/* Room status indicator */}
                {roomStatus && (
                    <div className="mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg text-base sm:text-lg md:text-xl font-semibold animate-pulse">
                        {roomStatus}
                    </div>
                )}

                {/* buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-2xl">
                    <button 
                        className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl md:text-2xl cursor-pointer border transition-all duration-200 ${
                            selectedChoice === 0 
                                ? 'bg-amber-800 border-amber-600 scale-105 shadow-lg' 
                                : 'hover:bg-amber-800'
                        }`}
                        onClick={ () => handleChoice(0) }
                        disabled={waiting || !joined}
                    >
                        ROCK
                    </button>
                    <button 
                        className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl md:text-2xl cursor-pointer border transition-all duration-200 ${
                            selectedChoice === 1 
                                ? 'bg-amber-200 text-black border-amber-400 scale-105 shadow-lg' 
                                : 'hover:bg-amber-200 hover:text-black'
                        }`}
                        onClick={ () => handleChoice(1) }
                        disabled={waiting || !joined}
                    >
                        PAPER
                    </button>
                    <button 
                        className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl md:text-2xl cursor-pointer border transition-all duration-200 ${
                            selectedChoice === 2 
                                ? 'bg-slate-600 text-black border-slate-400 scale-105 shadow-lg' 
                                : 'hover:bg-slate-600 hover:text-black'
                        }`}
                        onClick={ () => handleChoice(2) }
                        disabled={waiting || !joined}
                    >
                        SCISSOR
                    </button>

                    
                </div>

                {/* stats */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-20 mt-6 sm:mt-8 px-6 sm:px-8 py-6 sm:py-8 bg-black/40 rounded-lg w-full max-w-3xl">
                    
                    <div className="text-center flex-1" >
                        <div className="text-xl sm:text-2xl font-bold" >WINS</div>
                        <div className="text-3xl sm:text-4xl font-bold text-green-400" > { gameStats.wins } </div>
                    </div>

                    <div className="text-center flex-1" >
                        <div className="text-xl sm:text-2xl font-bold" >LOSSES</div>
                        <div className="text-3xl sm:text-4xl font-bold text-red-400" > { gameStats.losses } </div>
                    </div>

                    <div className="text-center flex-1" >
                        <div className="text-xl sm:text-2xl font-bold" >DRAWS</div>
                        <div className="text-3xl sm:text-4xl font-bold text-blue-400" > { gameStats.draws } </div>
                    </div>


                </div>


            </div>

            <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 gap-2 px-4">
                <input 
                    type="text" 
                    value={roomId}
                    className="px-4 py-2 rounded border w-full max-w-xs text-center text-sm sm:text-base"
                    onChange={ (e) => setRoomId( e.target.value.toLowerCase() ) }
                />
                <button
                 className="cursor-pointer px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base"
                 onClick={handleJoinRoom}
                 >
                    Join
                </button>
            </div>

            {/* result */}
            { result &&
                (
                    <div className="mt-8 sm:mt-10 flex justify-center px-4" >
                        <div className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-2xl sm:text-3xl font-bold shadow-xl transition-all duration-300
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