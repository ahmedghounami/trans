let positions = {p1:50, p2:50, ballx:50, bally:50, angle:0, vx:0, vy:0, direction:1, directionchanged:false, speed:1, bootrange:80}
// wsServer.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port:  9090});

wss.on('connection', (ws) => {
  console.log('Client connected');

//   ws.on('keydown', (key) => {
//     console.log('Received:', key);
//     ws.send(`Server got your key: ${key}`);
//   });
  ws.on('message', (msg) => {
    if(msg == 'getpositions' ){
    console.log('getpositions');
    ws.send(JSON.stringify(positions));}
  });

  ws.send(JSON.stringify({ type: 'welcome', message: 'Welcome to the game' }));
});

module.exports = wss;
