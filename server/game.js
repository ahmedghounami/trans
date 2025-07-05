
const WebSocket = require('ws');
let players = []
let playercount = 1;
const ws = new WebSocket.Server({ port:  9090});
ws.on('connection', (ws) => {
const keysPressed = {};

let positions = {p1:50, p2:50, ballx:50, bally:50, angle:0, vx:0, vy:0, direction:1, directionchanged:false, speed:1, bootrange:70} ;
console.log('Client connected');
players = [...players, {id:playercount, positions}];
const CurentID = playercount;
playercount++;
console.log(players);

  ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    if(data.type == 'getpositions' ){
    console.log('getpositions');
    ws.send(JSON.stringify(positions));}
    if(data.type == "keydown")
    {
      keysPressed[data.key] = true;
    }
    if(data.type == "keyup")
    {
      keysPressed[data.key] = false;
    }
    

  });
  const intervalId = setInterval(()=>{
  let vx = Math.cos(positions.angle * (Math.PI / 180)) * positions.speed;
  let vy = Math.sin(positions.angle * (Math.PI / 180)) * positions.speed;
  vx *= positions.direction;
  vy *= positions.direction;
  
  if(keysPressed["w"] &&( positions.p1 - 10)-2.5 >= 0)     
      positions.p1=positions.p1-2.5
  if(keysPressed["s"] &&  (10 + positions.p1) + 2.5 <= 100 )
      positions.p1=positions.p1+2.5
  // if(keysPressed["ArrowUp"] && positions.p2 - 2.5 - 10 >= 0)
  //     positions.p2=positions.p2-2.5
  // if(keysPressed["ArrowDown"] && (10 + positions.p2) + 2.5 <= 100 )
  //     positions.p2=positions.p2+2.5
  if(positions.bally > positions.p2 +5 && positions.ballx > positions.bootrange   && (10 + positions.p2) + 2.5 <= 100 )
      positions.p2=positions.p2+2.5
  else if(positions.bally < positions.p2 -5 && positions.ballx > positions.bootrange  && ( positions.p2 - 10) - 2.5 >= 0 )
      positions.p2=positions.p2-2.5
  if( positions.ballx <= 100  && positions.ballx + vx >= 0 )
  {
      
      if(((positions.bally >= positions.p2 - 10 && positions.bally <= positions.p2 + 10) && positions.ballx + vx > 96))
              {
              let diff = (positions.bally - positions.p2) / 10;
              if(!diff)
                  diff = 0.02
              positions.direction = -1;
              positions.angle = diff *(-75);
              if(positions.speed < 3)
                  positions.speed += 0.05;
              }
      else if(((positions.bally >= positions.p1 - 10 && positions.bally <= positions.p1 + 10) && positions.ballx + vx  < 4) && positions.direction == -1)
          {
              let diff = (positions.bally - positions.p1) / 10;
              if(!diff)
                  diff++;
              positions.direction = 1;
              positions.angle = diff *(75)
              if(positions.speed < 3)
                  positions.speed += 0.05;
          }
      if((positions.bally + vy  <= 2 || positions.bally + vy >= 98) && !positions.directionchanged)
          {
              if(!positions.angle)
                  positions.angle -= 5;
              positions.angle *= -1 ;
              positions.directionchanged = true;
          }
      else if((positions.bally + vy >  2 && positions.bally + vy < 98)) 
          positions.directionchanged = false;
      positions = {...positions, ballx:(positions.ballx+vx), bally:(positions.bally+vy)}
      
  }
  else{
      positions  = {...positions,p1:50, p2:50, ballx:50, bally:50, angle:0, vx:0, vy:0, directionchanged:false, speed:1, bootrange:70}

  }
  ws.send(JSON.stringify(positions))
  }, 20)
ws.on('close', () => {
  console.log('Client disconnected');
  intervalId.close()
  players = players.filter(player => player.id != CurentID);
  
});

  ws.send(JSON.stringify({ type: 'welcome', message: 'Welcome to the game' }));
});

// module.exports = wss;
