/*
what the room object looks like: 
    {

        room_id,
        half_choice,
        half_socketId,
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

// Socket.IO RPS handler
const rpsHandler = (io, db) => {
    io.on('connection', (socket) => {
        console.log("⚡ RPS player connected:", socket.id)
        let userId = null // store user id for this connection
        let currentRoomId = null // track which room this socket is in

        // store userId when provided
        socket.on('set_user', (data) => {
            userId = data.userId
            console.log(`👤 User ${userId} connected for RPS`)
        })

        // when the Join button is clicked
        socket.on('create_or_join_room', (msg) => {
            console.log(`🎮 create_or_join_room received ${msg.roomId}`)
            
            if (msg.userId) {
                userId = msg.userId
            }

            room_exists = false
            let room = null
            for ( let i = 0 ; i < rooms.length ; i++ )
                if ( rooms[i].room_id === msg.roomId )
                {
                    room_exists = true
                    room = rooms[i]
                    console.log("🔄 room already exists")
                    break
                }

            if ( !room_exists )
            {
                rooms.push({
                    room_id: msg.roomId,
                    half_choice: NO_CHOICE,
                    half_socketId: null,
                    half_userId: null
                })
            }
            else if (room && room.half_socketId && room.half_socketId !== socket.id)
            {
                // Room is full
                socket.emit('rps_error', 'Room is full!')
                return
            }

            // Join the Socket.IO room
            socket.join(msg.roomId)
            currentRoomId = msg.roomId
            
            // Notify all players in the room
            io.to(msg.roomId).emit('player_joined', { roomId: msg.roomId })

            console.log(rooms)
        })

        // when a choice is clicked
        socket.on('rps', (msg) => {
            console.log(`✊✋✌️ rps message received ${msg.roomId} , choice: ${msg.choice}`)
            
            if (msg.userId) {
                userId = msg.userId
            }

            let room = null
            let result
            let half_turn = 0

            for ( let i = 0 ; i < rooms.length ; i++ )
                if ( rooms[i].room_id === msg.roomId )
                {

                    if ( rooms[i].half_choice == NO_CHOICE && rooms[i].half_socketId == null )
                    {
                        half_turn = 1
                        rooms[i].half_choice = msg.choice
                        rooms[i].half_socketId = socket.id
                        rooms[i].half_userId = userId
                    }
                    room = rooms[i]
                    break
                }

            if ( !room )
            {
                socket.disconnect()
                // remove room from array
                return
            }

            if ( !half_turn && socket.id == room.half_socketId )
            {
                socket.disconnect()
                // remove room from array
                return
            }

            // Prevent player from playing with themselves
            if ( !half_turn && userId === room.half_userId )
            {
                socket.emit('rps_error', 'Cannot play with yourself!')
                return
            }

            if ( room && !half_turn )
            {
                result = rps_winner( msg.choice , room.half_choice )
                
                // Update database for both players
                updateRPSStats(db, userId, result)
                updateRPSStats(db, room.half_userId, -result)
                
                // Send results to both players
                socket.emit('rps_result', result)
                io.to(room.half_socketId).emit('rps_result', -result)
                
                // Reset room for next game
                room.half_socketId = null
                room.half_choice = NO_CHOICE
                room.half_userId = null
                // remove room from array
            }
        })

        socket.on('disconnect', () => {
            console.log("❌ RPS player disconnected:", socket.id)
            
            // Notify other players in the room
            if (currentRoomId) {
                socket.to(currentRoomId).emit('player_left')
            }
            
            // Find and clean up any room this player was in
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].half_socketId === socket.id) {
                    rooms[i].half_socketId = null
                    rooms[i].half_choice = NO_CHOICE
                    rooms[i].half_userId = null
                    break
                }
            }
        })
    })
}

// Function to update RPS stats in database
function updateRPSStats(db, userId, result) {
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

export { rpsHandler }