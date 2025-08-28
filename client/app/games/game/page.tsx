'use client';
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Loader from "@/app/components/loading";
import { useRouter } from "next/navigation";
import { Homecontext } from "../layout";
import Loading from "@/app/components/loading";

export default function Game()
{
    
      const router = useRouter();
    const serchParams = useSearchParams()
    const gametype = serchParams.get('gametype')
      const {selected} = Homecontext();

    // console.log(gametype);
    
    const [Positions, setPositions] = useState({})
    
      const {me} = Homecontext();
      console.log(me);
      
    useEffect(()=>
    {
        if(me){
            console.log(me);
            
        const socket = new WebSocket(`wss://${window.location.host}/ws?gametype=${gametype}`);
        socket.addEventListener('open', ()=>{
            socket.send(JSON.stringify({type:'getpositions',id:me.id}))
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
}},[me])
    if(!Positions.score || !selected.types || !selected.types[0]
    ) {
        console.log("loading");
    return<div className="bg-gray-400/30 backdrop-blur-sm flex flex-col justify-center items-center z-50  absolute top-0 bottom-0 left-0 right-0   ">
        <Loading/>
    </div>
    }
    if (Positions.win) {
        setTimeout(() => {
            router.push("/home")
        }, 500);
        console.log("Victory");
        console.log(Positions.win);
        
    return<div className="bg-gray-400/30 backdrop-blur-sm flex flex-col justify-center items-center z-50  absolute top-0 bottom-0 left-0 right-0   ">
        {Positions.win == 1 ?
            <Loader word={"Victory!"}></Loader>:
            <Loader word={"Defeat"}></Loader>
    }
    </div>
        
    }
    return<div className="bg-gray-400/30 backdrop-blur-sm flex justify-center items-center z-50  absolute top-0 bottom-0 left-0 right-0   ">
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
            <div id="table" 
            style={{background:selected.types[0].img[0] == '#'  ?selected.types[0].img:""}}
            className={` relative ${Positions.host && `transform -scale-x-100`}  bg-[#252525] flex justify-center  border-4 rounded-2xl w-full aspect-[9/5]`}
            >
            
            {  selected.types[0].img[0] != '#' ? <Image fill  className=" object-cover object-center" src={selected.types[0].img}  alt="profile"></Image>:<></>}
                <div className=" border border-dashed h-full "></div>
                <div
                id="padle1"
                className={`h-1/5 -translate-y-1/2  aspect-[1/6] rounded-full bg-[#fff] absolute left-1`}
                 style={{ top: `${Positions.p1}%`,background:selected.types[1].img[0] == '#'  ?selected.types[1].img:"" }}
                 >
            {  selected.types[1].img[0] != '#' ? <Image fill  className=" object-cover object-center" src={selected.types[1].img}  alt="profile"></Image>:<></>}

                 </div>
                <div id="padle2" className="h-1/5 -translate-y-1/2 aspect-[1/6] rounded-full bg-green-700 absolute right-1"
                 style={{ top: `${Positions.p2}%`,background:selected.types[1].img[0] == '#'  ?selected.types[1].img:"" }}>
            {  selected.types[1].img[0] != '#' ? <Image fill  className=" object-cover object-center" src={selected.types[1].img}  alt="profile"></Image>:<></>}

                 </div>
                <div id="ball"
                style={ {top: `${Positions.bally}%`, left: `${Positions.ballx}%` , background:selected.types[2].img[0] == '#'  ?selected.types[2].img:""} }
                className=" bg-[#c7c7c7] h-[4%] -translate-1/2 aspect-square   rounded-full absolute"
                >
            {  selected.types[2].img[0] != '#' ? <Image fill  className=" object-cover object-center" src={selected.types[2].img}  alt="profile"></Image>:<></>}

                </div>
            </div>
        </div>
    </div>
}