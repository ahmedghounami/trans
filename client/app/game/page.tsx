'use client';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Game()
{
    const [Positions, setPositions] = useState({})
    const positionsRef = useRef(Positions);
    const bootrange = 80;
    useEffect(()=>{
const socket = new WebSocket('ws://localhost:9090');
    socket.addEventListener('open', ()=>{
        socket.send('getpositions')
    })
    socket.onmessage = (event)=>{
        const data = JSON.parse(event.data)
        console.log(data);
        setPositions(data)
    }},[])
    // useEffect(()=>{
    // async function start()
    // {
    //     fetch("http://localhost:8080/game")
    //     .then(async(datajson) => {
    //         const data = await datajson.json()
    //         setPositions(data)
            
    //     })
    //     .catch((err)=>console.log(err))

    // }
    // start();

    // },[])
    
    // const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});
    const keysPressed = useRef({})
    useEffect(()=>{
        positionsRef.current = Positions;
    },[Positions])
    useEffect(()=>
    {
        function keydown(event: Event){
        keysPressed.current[event.key] = true;
        }
        function keyup(event: Event){
        keysPressed.current[event.key] = false;
    }
                
        
        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)
    },[])
      useEffect(() => {
        setTimeout(()=>{
            const intervalid = setInterval(()=>{
            
            
            // console.log(keysPressed);
            let newpositions = positionsRef.current;
            let vx = Math.cos(newpositions.angle * (Math.PI / 180)) * newpositions.speed;
            let vy = Math.sin(newpositions.angle * (Math.PI / 180)) * newpositions.speed;
            vx *= newpositions.direction;
            vy *= newpositions.direction;
            


            if(keysPressed.current["w"] &&( newpositions.p1 - 10)-2.5 >= 0)     
                newpositions.p1=newpositions.p1-2.5
            if(keysPressed.current["s"] &&  (10 + newpositions.p1) + 2.5 <= 100 )
                newpositions.p1=newpositions.p1+2.5
            // if(keysPressed.current["ArrowUp"] && newpositions.p2 - 2.5 - 10 >= 0)
            //     newpositions.p2=newpositions.p2-2.5
            // if(keysPressed.current["ArrowDown"] && (10 + newpositions.p2) + 2.5 <= 100 )
            //     newpositions.p2=newpositions.p2+2.5
            if(newpositions.bally > newpositions.p2 +5 && newpositions.ballx > newpositions.bootrange   && (10 + newpositions.p2) + 2.5 <= 100 )
                newpositions.p2=newpositions.p2+2.5
            else if(newpositions.bally < newpositions.p2 -5 && newpositions.ballx > newpositions.bootrange  && ( newpositions.p2 - 10) - 2.5 >= 0 )
                newpositions.p2=newpositions.p2-2.5
            if( newpositions.ballx <= 100  && newpositions.ballx + vx >= 0 )
            {
                
                if(((newpositions.bally >= newpositions.p2 - 10 && newpositions.bally <= newpositions.p2 + 10) && newpositions.ballx + vx > 96))
                        {
                        let diff = (newpositions.bally - newpositions.p2) / 10;
                        if(!diff)
                            diff = 0.02
                        newpositions.direction = -1;
                        newpositions.angle = diff *(-75);
                        if(newpositions.speed < 3)
                            newpositions.speed += 0.05;
                        }
                else if(((newpositions.bally >= newpositions.p1 - 10 && newpositions.bally <= newpositions.p1 + 10) && newpositions.ballx + vx  < 4) && newpositions.direction == -1)
                    {
                        let diff = (newpositions.bally - newpositions.p1) / 10;
                        if(!diff)
                            diff++;
                        newpositions.direction = 1;
                        newpositions.angle = diff *(75)
                        if(newpositions.speed < 3)
                            newpositions.speed += 0.05;
                    }
                if((newpositions.bally + vy  <= 2 || newpositions.bally + vy >= 98) && !newpositions.directionchanged)
                    {
                        if(!newpositions.angle)
                            newpositions.angle -= 5;
                        newpositions.angle *= -1 ;
                        newpositions.directionchanged = true;
                    }
                else if((newpositions.bally + vy >  2 && newpositions.bally + vy < 98)) 
                    newpositions.directionchanged = false;
                newpositions = {...newpositions, ballx:(newpositions.ballx+vx), bally:(newpositions.bally+vy)}
                
            }
            else{
                newpositions = {...newpositions, ballx:50, bally:50, angle:0, speed:1}
            }
            setPositions(newpositions)
            // if(Positions.ballx == 100)
            //     setPositions((oldposition) => {return({...oldposition, ballx:50})})

        }, 20)},1000)
        }, []);
        // console.log(Positions);
        
    
    return<div className="bg-gray-400/30 flex justify-center items-center z-50 backdrop-blur-sm absolute top-0 bottom-0 left-0 right-0   ">
        <div className="flex  flex-col gap-5 w-2/3">
            <div className="flex items-center justify-between px-5">
                <div className="flex items-center gap-5">
                    <div className="rounded-full w-14 overflow-hidden h-14 border  ">
                    <Image className="w-full h-full object-cover object-center " src="/profile.jpg" width={60} height={60} alt="profile"></Image>
                    </div>
                    <p>player 1</p>
                </div>
                <div>0 - 0</div>
                <div className="flex items-center gap-5">
                    <p>player 2</p>
                    <div className="rounded-full w-14 overflow-hidden h-14 border  ">
                    <Image className="w-full h-full object-cover object-center " src="/profile.jpg" width={60} height={60} alt="profile"></Image>
                    </div>
                </div>
            </div>
            {/* transform -scale-x-100 add this to table to mirror rotation */}
            <div id="table" className=" relative   bg-[#A7C7CB] flex justify-center  border-4 rounded-2xl w-full aspect-[9/5]">
                <div className=" border border-dashed h-full "></div>
                <div id="padle1" className={`h-1/5 -translate-y-1/2  aspect-[1/6] rounded-full bg-red-700 absolute left-1`}
                 style={{ top: `${Positions.p1}%` }}></div>
                <div id="padle2" className="h-1/5 -translate-y-1/2 aspect-[1/6] rounded-full bg-green-700 absolute right-1"
                 style={{ top: `${Positions.p2}%` }}></div>
                <div id="ball" style={ {top: `${Positions.bally}%`, left: `${Positions.ballx}%`} } className="h-[4%] -translate-1/2 aspect-square   bg-amber-400 rounded-full absolute"></div>
            </div>
        </div>
    </div>
}