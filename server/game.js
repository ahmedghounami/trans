
import { WebSocketServer } from 'ws';
import url from 'url';
let players = []
let playercount = 1;
function CalculateballVelocity(positions, angle)
{
    let vx = Math.cos(angle * (Math.PI / 180)) * positions.speed;
    let vy = Math.sin(angle * (Math.PI / 180)) * positions.speed;
    vx *= positions.direction;
    vy *= positions.direction;
    return{vx,vy}
}
const ws = new WebSocketServer({ port:  9090});
function botmouvement(keysPressed, positions)
{
    const intervalID = setInterval(()=>{
        let pretectedposition = 50;
        let predectedtime = 100;
        let {ballx, bally, angle} = positions
        
        if(positions.direction == 1)
        {
            let {vx, vy} = CalculateballVelocity(positions, angle)
            let directionchanged = false;
            while(ballx < 96)
            {
                if((bally + vy  <= 2 || bally + vy >= 98) && !directionchanged)
                {
                    if(!angle)
                        angle -= 5;
                    angle *= -1 ;
                    directionchanged = true;
                }
                else if((bally + vy >  2 && bally + vy < 98)) 
                    directionchanged = false;
                ballx += vx;
                bally += vy;
                ({vx, vy} = CalculateballVelocity(positions, angle))
            }
        }
        
        const isup = bally < positions.p2
        // positions.p2 = bally;
        predectedtime =  Math.abs(((bally - positions.p2) / 2.5)*20)
        isup ? keysPressed['botUp'] = true : keysPressed['botDown'] = true;
        setTimeout(()=>{
            keysPressed['botUp'] = false;
            keysPressed['botDown'] = false
        },predectedtime)
    },1000)
}
ws.on('connection', (ws, request) => {
const keysPressed = {};
const query = url.parse(request.url, true).query
const gametype = query.gametype;
let positions = {p1:50, p2:50,host:0, ballx:50,score:{p1:0, p2:0}, bally:50, angle:0, direction:1, directionchanged:false, speed:1, botrange:70} ;
console.log('Client connected');
players = [...players, {id:playercount, startgame:0, positions, gametype, oponent:null, p1:0}];
const Curentplayer = players.find(p=>p.id == playercount);
    
if(gametype == "local" || gametype == "localvsbot"){
    Curentplayer.startgame = 1
    if(gametype == "localvsbot")
        botmouvement(keysPressed, Curentplayer.positions);
}
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
        
       return (p.id != Curentplayer.id && p.startgame == 0)
    });
    if(player && Curentplayer.startgame == 0 && !Curentplayer.oponent && !player.startgame && !player.oponent)
    {
        
        player.oponent = Curentplayer;
        Curentplayer.oponent = player;
        Curentplayer.p1 = 1;
        Curentplayer.oponent.positions.host = 1;
        Curentplayer.startgame = 1;
    }
    else if(Curentplayer.oponent)
    {
        Curentplayer.startgame = 1;
    }
if(Curentplayer.startgame)
{
  let {vx, vy} = CalculateballVelocity(Curentplayer.positions, Curentplayer.positions.angle)
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
    if(gametype == "localvsbot"){
        if(keysPressed["botUp"] && Curentplayer.positions.p2 - 2.5 - 10 >= 0)
            Curentplayer.positions.p2=Curentplayer.positions.p2-2.5
        if(keysPressed["botDown"] && (10 + Curentplayer.positions.p2) + 2.5 <= 100 )
            Curentplayer.positions.p2=Curentplayer.positions.p2+2.5}
    if(gametype == "online")
    {
        if(Curentplayer.p1 == 1){
        Curentplayer.positions.p1 = Curentplayer.oponent.positions.p1;
        Curentplayer.positions.ballx = Curentplayer.oponent.positions.ballx;
        Curentplayer.positions.bally = Curentplayer.oponent.positions.bally;
        }
        else{
        Curentplayer.positions.p2 = Curentplayer.oponent.positions.p2;

        }
    }
  if( Curentplayer.positions.ballx <= 100  && Curentplayer.positions.ballx + vx >= 0 )
  {
    if(Curentplayer.p1 == 0 ){
      
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
                  diff = 0.02
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
      Curentplayer.positions.ballx=(Curentplayer.positions.ballx+vx)
      Curentplayer.positions.bally=(Curentplayer.positions.bally+vy)
        }
  }
  else{
      Curentplayer.positions.direction == 1 ? Curentplayer.positions.score.p2++ : Curentplayer.positions.score.p1++;
      if(Curentplayer.oponent)
        Curentplayer.oponent.positions.score = Curentplayer.positions.score;
    if((Curentplayer.positions.score.p2 > 11 && Curentplayer.positions.score.p1 + 2 <= Curentplayer.positions.score.p2 )
        || (Curentplayer.positions.score.p1 > 11 && Curentplayer.positions.score.p2 + 2 <= Curentplayer.positions.score.p1)
    ){
        console.log("WIN");
        
        Curentplayer.positions.win = 1;
        Curentplayer.startgame = 0;
        Curentplayer.p1=0;
        if(Curentplayer.oponent != null){
        // Curentplayer.oponent.oponent = null;
        // Curentplayer.oponent.p1 = 0;
        Curentplayer.oponent.startgame = 0;
    Curentplayer.oponent=null
}
}
    Curentplayer.positions.p1=50; Curentplayer.positions.p2=50;
    Curentplayer.positions.ballx=50; Curentplayer.positions.bally=50;
    Curentplayer.positions.angle=0; Curentplayer.positions.speed=1;
  }
}
  ws.send(JSON.stringify(Curentplayer.positions))
  }, 20)
ws.on('close', () => {
  console.log('Client disconnected');
  intervalId.close()
  players = players.filter(player =>{
    if(player.id == Curentplayer.id && player.oponent)
    {
        player.oponent.oponent = null;
        player.oponent.p1 = 0;
        player.oponent.startgame = 0;
        player.oponent.positions  = {...player.oponent.positions,p1:50, p2:50, ballx:50, bally:50, angle:0}
    }
     return player.id != Curentplayer.id
    });
  
});

  ws.send(JSON.stringify({ type: 'welcome', message: 'Welcome to the game' }));
});

// module.exports = wss;
export default {};