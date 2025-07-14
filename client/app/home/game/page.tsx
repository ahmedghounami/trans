'use client';
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Game()
{
    const serchParams = useSearchParams()
    const gametype = serchParams.get('gametype')
    console.log(gametype);
    
    const [Positions, setPositions] = useState({})
    useEffect(()=>
    {
        const socket = new WebSocket(`ws://localhost:9090?gametype=${gametype}`);
        socket.addEventListener('open', ()=>{
            socket.send(JSON.stringify({type:'getpositions'}))
        })
        socket.onmessage = (event)=>{
            const data = JSON.parse(event.data)
            setPositions(data)
        }
        function keydown(event: Event){
        socket.send(JSON.stringify({type:'keydown', key:event.key}))
        }
        function keyup(event: Event){
        socket.send(JSON.stringify({type:'keyup', key:event.key}))
    }
                
        
        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)
    },[])
    console.log(Positions);
    
    return<div className="bg-gray-400/30 flex justify-center items-center z-50 backdrop-blur-sm absolute top-0 bottom-0 left-0 right-0   ">
        <div className="flex  flex-col gap-5 w-2/3">
            <div className="flex items-center justify-between px-5">
                <div className="flex items-center gap-5">
                    <div className="rounded-full w-14 overflow-hidden h-14 border  ">
                    <Image className="w-full h-full object-cover object-center " src="/profile.jpg" width={60} height={60} alt="profile"></Image>
                    </div>
                    <p>player 2</p>
                </div>
                <div>{`${Positions.score?.p2} - ${Positions.score?.p1}`}</div>
                <div className="flex items-center gap-5">
                    <p>player 1</p>
                    <div className="rounded-full w-14 overflow-hidden h-14 border  ">
                    <Image className="w-full h-full object-cover object-center " src="/profile.jpg" width={60} height={60} alt="profile"></Image>
                    </div>
                </div>
            </div>
            {/* transform -scale-x-100 add this to table to mirror rotation */}
            <div id="table" className={` relative ${Positions.host && `transform -scale-x-100`}  bg-[#A7C7CB] flex justify-center  border-4 rounded-2xl w-full aspect-[9/5]`}>
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