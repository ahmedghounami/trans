'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from "react";
import SkinContainer from "../components/SkinContainer";
import Statistics from "../profile/staistique";

const HomeContext = createContext();
export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [GameType, setGameType] = useState("localvsbot")
  const [skinType, setSkinType] = useState('table');
  const [selected, setselected] = useState({})
  const router = useRouter();
  const [skins, setSkins] = useState([]);
  // useEffect(()=>{
  //     setSkins(data)
  // },[skinType])
  const [me, setMe] = useState(0);
  useEffect(() => {
    async function fetchme() {
      try {
        const response = await fetch('http://localhost:4000/me', {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched user data:", data);
        setMe(data);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchme();
  }
    , []);
  useEffect(() => {
    if (me) {
      console.log(me);
      async function fetchOwnedSkins() {
        try {
          const res = await fetch('http://localhost:4000/player_skins?player_id=' + me.id)
          if (res.error) {
            throw new Error(res.error)
          }
          const data = await res.json();
          console.log(data);

          setSkins(data)
        } catch (error) {
          console.error("Error fetching owned skins data:", error);
        }

      }
      fetchOwnedSkins();

    }
  }, [me])
  return (
    <HomeContext.Provider value={{ skins, me, selected }}>
      <div className="flex flex-col 
               h-full
               w-full
                p-4  gap-4  ">
        <div className="flex-1 min-h-64 flex gap-4">
          <div className=" relative   overflow-hidden rounded-2xl flex-4/6">
            <Image fill className=" object-cover object-center" src={`/${GameType}.webp`} alt="profile"></Image>
            <div className="absolute h-1/6  bottom-0 left-0 right-0">
              <div className="bg-black/40 flex justify-evenly absolute w-full z-20 h-full  backdrop-blur-sm">
                <div className="bg-gray-300/50 flex items-center justify-center self-center  h-3/4 aspect-square rounded-full"></div>
                <button onClick={() => { router.push('/home/game?gametype=' + GameType) }} className="bg-blue-400 cursor-pointer flex items-center justify-center  h-full aspect-square rounded-full -translate-y-1/2">
                  <Image className=" h-3/4 w-fit " src="game-controller.svg" width={60} height={40} alt="profile"></Image>
                </button>
                <div className="bg-gray-300/50 flex items-center justify-center self-center  h-3/4 aspect-square rounded-full"></div>
              </div>
              <div className="bg-black/40   absolute top-0 left-1/2 -translate-x-1/2   backdrop-blur-sm h-2/3 aspect-[2/1] rounded-t-full transform -translate-y-[calc(100%-1px)]"></div>
            </div>
          </div>
          <div className="bg-amber-200 flex-2/6 "> </div>

        </div>
        <div className=" py-2 px-4  max-w-[calc(100vw-125px)] max-[768]:max-w-[94vw] gap-4    overflow-x-scroll flex-none 
            flex 
           [&::-webkit-scrollbar-thumb]:bg-blue-400
           [&::-webkit-scrollbar-thumb]:rounded-full
           [&::-webkit-scrollbar]:h-2">
          <div onClick={() => { setGameType("localvsbot") }}
            className={`relative group  overflow-hidden  cursor-pointer flex  
              h-36 w-[30vw] min-w-36 bg-white border ${GameType == "localvsbot" ? "border-blue-500" : "border-gray-500"} 
              rounded-2xl shadow-md   transition hover:scale-105 
              hover:shadow-lg hover:border-blue-500`}>
            <Image fill className=" object-cover object-center" src="/PlayerVBot.webp" alt="profile"></Image>
            <div className="z-10 rounded-2xl w-full flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs ">
              <h3 className={`text-xl group-hover:text-blue-500 ${GameType == "localvsbot" ? "text-blue-500" : "text-white"}  font-semibold mb-1`}>Play vs Bot</h3>
              <p className={`text-sm group-hover:text-blue-300  ${GameType == "localvsbot" ? "text-blue-300" : "text-gray-300"} text-center`}>Practice against the computer</p>
            </div>
          </div>
          <div onClick={() => { setGameType("local") }}
            className={`relative group  overflow-hidden  cursor-pointer flex  
              h-36 w-[30vw] min-w-36 bg-white border ${GameType == "local" ? "border-blue-500" : "border-gray-500"} 
              rounded-2xl shadow-md   transition hover:scale-105 
              hover:shadow-lg hover:border-blue-500`}>
            <Image fill className=" object-cover object-center" src="/2players.webp" alt="profile"></Image>
            <div className="z-10 rounded-2xl w-full flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs ">
              <h3 className={`text-xl group-hover:text-blue-500 ${GameType == "local" ? "text-blue-500" : "text-white"}  font-semibold mb-1`}>2 Players</h3>
              <p className={`text-sm group-hover:text-blue-300  ${GameType == "local" ? "text-blue-300" : "text-gray-300"} text-center`}>Play on the same device</p>
            </div>
          </div>
          <div onClick={() => { setGameType("online") }}
            className={`relative group  overflow-hidden  cursor-pointer flex  
              h-36 w-[30vw] min-w-36 bg-white border ${GameType == "online" ? "border-blue-500" : "border-gray-500"} 
              rounded-2xl shadow-md   transition hover:scale-105 
              hover:shadow-lg hover:border-blue-500`}>
            <Image fill className=" object-cover object-center" src="/online.jpeg" alt="profile"></Image>
            <div className="z-10 rounded-2xl w-full flex flex-col justify-center items-center bg-black/50 backdrop-blur-xs ">
              <h3 className={`text-xl group-hover:text-blue-500 ${GameType == "online" ? "text-blue-500" : "text-white"}  font-semibold mb-1`}>Online Match</h3>
              <p className={`text-sm group-hover:text-blue-300  ${GameType == "online" ? "text-blue-300" : "text-gray-300"} text-center`}>Play with players around the world</p>
            </div>
          </div>
        </div>
        
        <Statistics className="flex-1" />
      </div>
      {children}
    </HomeContext.Provider>

  );
}
export function Homecontext() {
  return useContext(HomeContext);
}