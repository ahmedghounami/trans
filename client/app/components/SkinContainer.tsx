"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
export default function SkinContainer({skinType}){
    console.log(skinType);
    
let data=[];
if (skinType == "table") {
    console.log("table");
    
data=[{selected:true, id:1, img:"/table1.png"},{selected:false, id:2, img:"/table2.png"},{selected:false, id:3, img:"/table3.png"},{selected:false, id:4, img:"/table4.png"}]
}
const [skins, setSkins] = useState([]);
useEffect(()=>{
    setSkins(data)
},[skinType])
  return( 
    <div className="px-4 py-2  max-w-[calc(100vw-125px)] max-[768]:max-w-[94vw] gap-8   overflow-y-hidden overflow-x-scroll 
                flex items-center 
               [&::-webkit-scrollbar-thumb]:bg-blue-400
               [&::-webkit-scrollbar-thumb]:rounded-full
               [&::-webkit-scrollbar]:h-2">
                {skins.map((skin, index)=>(
                <div key={index} onClick={()=>
                    {setSkins((oldskins)=>
                        oldskins.map((oldskin)=>
                            oldskin.id == skin.id
                                ? {...oldskin, selected:true}
                                : {...oldskin, selected:false}
                        )
                    )}
                }
                className={`relative group    cursor-pointer flex  
                  h-4/5  aspect-[9/5]    
                  shadow-md   transition hover:scale-105 
                  `}>
                <Image fill  className=" object-cover object-center" src={skin.img}  alt="profile"></Image>
                <div className="absolute  h-full w-full">
                    <div className={`absolute top-0 w-1/6 aspect-square  border-t-2 border-l-2 -translate-2  ${skin.selected ? "border-blue-500":"border-gray-500"} group-hover:border-blue-500 transition-all duration-300 `}></div>
                    <div className={`absolute bottom-0 w-1/6 aspect-square  border-b-2 border-l-2  -translate-x-2 translate-y-2  ${skin.selected ? "border-blue-500":"border-gray-500"} group-hover:border-blue-500 transition-all duration-300 `}></div>
                    <div className={`absolute top-0 right-0 w-1/6 aspect-square  border-t-2 border-r-2  translate-x-2 -translate-y-2  ${skin.selected ? "border-blue-500":"border-gray-500"} group-hover:border-blue-500 transition-all duration-300 `}></div>
                    <div className={`absolute bottom-0 right-0 w-1/6 aspect-square  border-b-2 border-r-2  translate-x-2 translate-y-2  ${skin.selected ? "border-blue-500":"border-gray-500"} group-hover:border-blue-500 transition-all duration-300 `}></div>
                </div>
                </div>))}
            </div>
)}