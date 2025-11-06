import { WebSocketServer } from "ws"

let rooms = []

// create new socket on port 8090
const ws = new WebSocketServer ( {port: 8090} )

ws.on('connection' , ( ws , req ) => {
    console.log (" rps player connected ")

    ws.on('message', ( data ) => {
        const msg = JSON.parse(data)

        console.log (`rps message received ${msg.roomId} , ${msg.type}`)

        if ( rooms.includes(msg.roomId) )
            console.log("room already exists")
        else
            

    } )

})




export default {}