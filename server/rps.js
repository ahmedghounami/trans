import { WebSocketServer } from "ws"
import sqlite3 from 'sqlite3';

// Connect to the same database
const db = new sqlite3.Database('sqlite.db');

/*
what the room object looks like: 
    {

        room_id,
        half_choice,
        half_soc,
        half_userId

    }
*/

const DRAW = 0
const WIN = 1
const LOSE = -1

function rps_winner( c1, c2 ) {
    if ( c1 === c2 ) return DRAW

    if ( c1 === ROCK ) {
        if ( c2 == SCISSOR ) return WIN
        if ( c2 == PAPER ) return LOSE
    }

    if ( c1 === PAPER ) {
        if ( c2 == ROCK ) return WIN
        if ( c2 == SCISSOR ) return LOSE
    }

    if ( c1 === SCISSOR ) {
        if ( c2 == PAPER ) return WIN
        if ( c2 == ROCK ) return LOSE
    }
}

const ROCK = 0
const PAPER = 1
const SCISSOR = 2
const NO_CHOICE = -1

let rooms = []
let room_exists

// create new socket on port 8090
const ws = new WebSocketServer ( {port: 8090} )

ws.on('connection' , ( ws , req ) => {
    console.log (" rps player connected ")
    let userId = null // store user id for this connection

    ws.on('message', ( data ) => {
        const msg = JSON.parse(data)

        console.log (`rps message received ${msg.roomId} , ${msg.type}`)

        // store userId when provided
        if (msg.userId) {
            userId = msg.userId
        }

        // when the Join button is clicked
        if ( msg.type === "create_or_join_room" )
        {
            room_exists = false
            for ( let i = 0 ; i < rooms.length ; i++ )
                if ( rooms[i].room_id === msg.roomId )
                {
                    room_exists = true
                    console.log("room already exists")
                    break

                }

            if ( !room_exists )
                rooms.push({
                    room_id: msg.roomId,
                    half_choice: NO_CHOICE,
                    half_soc: null,
                    half_userId: null
                })

            console.log(rooms)
            

        }


        // when a choice is clicked
        if ( msg.type == "rps" )
        {
            let room = null
            let result
            let half_turn = 0

            for ( let i = 0 ; i < rooms.length ; i++ )
                if ( rooms[i].room_id === msg.roomId )
                {

                    if ( rooms[i].half_choice == NO_CHOICE && rooms[i].half_soc == null )
                    {
                        half_turn = 1
                        rooms[i].half_choice = msg.choice
                        rooms[i].half_soc = ws
                        rooms[i].half_userId = userId
                    }
                    room = rooms[i]
                    break
                }

            if ( !room )
            {
                ws.close()
                // remove room from array
                return
            }

            if ( !half_turn && ws == room.half_soc )
            {
                ws.close()
                // remove room from array
                return
            }
            if ( room && !half_turn )
            {
                result = rps_winner( msg.choice , room.half_choice )
                
                // Update database for both players
                updateRPSStats(userId, result)
                updateRPSStats(room.half_userId, -result)
                
                ws.send( result )
                room.half_soc.send( -result )
                room.half_soc = null
                room.half_choice = NO_CHOICE
                room.half_userId = null
                // remove room from array
            }
            

        }


    } )

})

// Function to update RPS stats in database
function updateRPSStats(userId, result) {
    if (!userId) return
    
    let column = ''
    if (result === WIN) column = 'rps_wins'
    else if (result === LOSE) column = 'rps_losses'
    else if (result === DRAW) column = 'rps_draws'
    
    if (column) {
        db.run(`UPDATE users SET ${column} = ${column} + 1 WHERE id = ?`, [userId], (err) => {
            if (err) {
                console.error('Error updating RPS stats:', err)
            } else {
                console.log(`Updated ${column} for user ${userId}`)
            }
        })
    }
}


export default {}