'use client';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Game()
{
    const [Positions, setPositions] = useState({p1:0, p2:0, ball:0})
    const positionsRef = useRef(Positions);
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
        
            const intervalid = setInterval(()=>{
            const padle1 = document.getElementById('padle1');
            const padle2 = document.getElementById('padle2');
            const table = document.getElementById('table');
            
            // console.log(keysPressed);
            
            if(keysPressed.current["w"] && positionsRef.current.p1-8 >= 0){
                
                setPositions((oldposition)=>{return({...oldposition, p1:oldposition.p1-8})})}
            if(keysPressed.current["s"] && padle1?.offsetHeight + positionsRef.current.p1 + 12 <=  table?.offsetHeight )
                setPositions((oldposition)=>{return({...oldposition, p1:oldposition.p1+8})})
            if(keysPressed.current["ArrowUp"] && positionsRef.current.p2-8 >= 0)
                setPositions((oldposition)=>{return({...oldposition, p2:oldposition.p2-8})})
            if(keysPressed.current["ArrowDown"] && padle2?.offsetHeight + positionsRef.current.p2+12 <=  table?.offsetHeight)
                setPositions((oldposition)=>{return({...oldposition, p2:oldposition.p2+8})})
        }, 16)
        }, []);
    
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
            <div id="table" className=" relative bg-[#A7C7CB] flex justify-center  border-4 rounded-2xl w-full aspect-[9/5]">
                <div className=" border border-dashed h-full "></div>
                <div id="padle1" className={`h-1/5  aspect-[1/6] rounded-full bg-red-700 absolute left-1`}
                 style={{ top: `${Positions.p1}px` }}></div>
                <div id="padle2" className="h-1/5 aspect-[1/6] rounded-full bg-red-700 absolute right-1"
                 style={{ top: `${Positions.p2}px` }}></div>
                <div id="ball" className="h-[4%] aspect-square bg-amber-400 rounded-full top-4 absolute"></div>
            </div>
        </div>
    </div>
}