
const WebSocket = require('ws');
const url = require('url');
let players = []
let playercount = 1;
const ws = new WebSocket.Server({ port:  9090});
ws.on('connection', (ws, request) => {
const keysPressed = {};
const query = url.parse(request.url, true).query
const gametype = query.gametype;
let startgame = 0;
if(gametype == "local" || gametype == "localvsboot"){
    startgame = 1
}
let positions = {p1:50, p2:50,host:0, ballx:50, bally:50, angle:0, vx:0, vy:0, direction:1, directionchanged:false, speed:1, bootrange:70} ;
console.log('Client connected');
players = [...players, {id:playercount, positions, gametype, oponent:null, p1:0}];
const Curentplayer = players.find(p=>p.id == playercount);
    
playercount++;

  ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    if(data.type == 'getpositions' ){
    console.log('getpositions');
    ws.send(JSON.stringify(Curentplayer.positions));}
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
    const player = players.find(p=>{
        
       return p.id != Curentplayer.id
    });
    if(player && startgame == 0 && !Curentplayer.oponent)
    {
        
        player.oponent = Curentplayer;
        Curentplayer.oponent = player;
        Curentplayer.p1 = 1;
        Curentplayer.oponent.positions.host = 1;
        startgame = 1;
    }
    else if(Curentplayer.oponent)
    {
        startgame = 1;
    }
if(startgame)
{
  let vx = Math.cos(Curentplayer.positions.angle * (Math.PI / 180)) * Curentplayer.positions.speed;
  let vy = Math.sin(Curentplayer.positions.angle * (Math.PI / 180)) * Curentplayer.positions.speed;
  vx *= Curentplayer.positions.direction;
  vy *= Curentplayer.positions.direction;
  if(Curentplayer.p1 == 0 ){
    if(keysPressed["w"] &&( Curentplayer.positions.p1 - 10)-2.5 >= 0)     
        Curentplayer.positions.p1=Curentplayer.positions.p1-2.5
    if(keysPressed["s"] &&  (10 + Curentplayer.positions.p1) + 2.5 <= 100 )
        Curentplayer.positions.p1=Curentplayer.positions.p1+2.5}
    if(gametype == "online" && Curentplayer.p1 == 1 )
    {
  
    if(keysPressed["w"] &&( Curentplayer.positions.p2 - 10)-2.5 >= 0)     
        Curentplayer.positions.p2=Curentplayer.positions.p2-2.5
    if(keysPressed["s"] &&  (10 + Curentplayer.positions.p2) + 2.5 <= 100 )
        Curentplayer.positions.p2=Curentplayer.positions.p2+2.5}
    if(gametype == "local" ){
        if(keysPressed["ArrowUp"] && Curentplayer.positions.p2 - 2.5 - 10 >= 0)
            Curentplayer.positions.p2=Curentplayer.positions.p2-2.5
        if(keysPressed["ArrowDown"] && (10 + Curentplayer.positions.p2) + 2.5 <= 100 )
            Curentplayer.positions.p2=Curentplayer.positions.p2+2.5}
    if(gametype == "localvsboot"){
        if(Curentplayer.positions.bally > Curentplayer.positions.p2 +5 && Curentplayer.positions.ballx > Curentplayer.positions.bootrange   && (10 + Curentplayer.positions.p2) + 2.5 <= 100 )
            Curentplayer.positions.p2=Curentplayer.positions.p2+2.5
        else if(Curentplayer.positions.bally < Curentplayer.positions.p2 -5 && Curentplayer.positions.ballx > Curentplayer.positions.bootrange  && ( Curentplayer.positions.p2 - 10) - 2.5 >= 0 )
            Curentplayer.positions.p2=Curentplayer.positions.p2-2.5}
    if(gametype == "online")
    {
        if(Curentplayer.p1 == 1){
        Curentplayer.positions.p1 = Curentplayer.oponent.positions.p1;
        Curentplayer.oponent.positions.ballx = Curentplayer.positions.ballx;
        Curentplayer.oponent.positions.bally = Curentplayer.positions.bally;
        }
        else{
        Curentplayer.positions.p2 = Curentplayer.oponent.positions.p2;

        }
    }
  if( Curentplayer.positions.ballx <= 100  && Curentplayer.positions.ballx + vx >= 0 )
  {
    if(Curentplayer.p1 == 1 ){
      
      if(((Curentplayer.positions.bally >= Curentplayer.positions.p2 - 10 && Curentplayer.positions.bally <= Curentplayer.positions.p2 + 10) && Curentplayer.positions.ballx + vx > 96))
              {
              let diff = (Curentplayer.positions.bally - Curentplayer.positions.p2) / 10;
              if(!diff)
                  diff = 0.02
              Curentplayer.positions.direction = -1;
              Curentplayer.positions.angle = diff *(-75);
              if(Curentplayer.positions.speed < 3)
                  Curentplayer.positions.speed += 0.05;
              }
      else if(((Curentplayer.positions.bally >= Curentplayer.positions.p1 - 10 && Curentplayer.positions.bally <= Curentplayer.positions.p1 + 10) && Curentplayer.positions.ballx + vx  < 4) && Curentplayer.positions.direction == -1)
          {
              let diff = (Curentplayer.positions.bally - Curentplayer.positions.p1) / 10;
              if(!diff)
                  diff++;
              Curentplayer.positions.direction = 1;
              Curentplayer.positions.angle = diff *(75)
              if(Curentplayer.positions.speed < 3)
                  Curentplayer.positions.speed += 0.05;
          }
      if((Curentplayer.positions.bally + vy  <= 2 || Curentplayer.positions.bally + vy >= 98) && !Curentplayer.positions.directionchanged)
          {
              if(!Curentplayer.positions.angle)
                  Curentplayer.positions.angle -= 5;
              Curentplayer.positions.angle *= -1 ;
              Curentplayer.positions.directionchanged = true;
          }
      else if((Curentplayer.positions.bally + vy >  2 && Curentplayer.positions.bally + vy < 98)) 
          Curentplayer.positions.directionchanged = false;
      Curentplayer.positions = {...Curentplayer.positions, ballx:(Curentplayer.positions.ballx+vx), bally:(Curentplayer.positions.bally+vy)}
        }
  }
  else{
      Curentplayer.positions  = {...Curentplayer.positions,p1:50, p2:50, ballx:50, bally:50, angle:0, vx:0, vy:0, directionchanged:false, speed:1, bootrange:70}

  }
}
  ws.send(JSON.stringify(Curentplayer.positions))
  }, 20)
ws.on('close', () => {
  console.log('Client disconnected');
  intervalId.close()
  players = players.filter(player => player.id != Curentplayer.id);
  
});

  ws.send(JSON.stringify({ type: 'welcome', message: 'Welcome to the game' }));
});

// module.exports = wss;
