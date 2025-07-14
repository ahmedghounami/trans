import Image from "next/image";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
<>
      <div className="flex flex-col p-4 gap-4 w-full h-full">
        <div className="flex-2/5 flex gap-4">
          <div className=" relative overflow-hidden rounded-2xl flex-4/6">
            <Image className="w-full h-full object-cover object-center " src="/PlayerVBot.webp" width={600} height={400} alt="profile"></Image>
            <div className="absolute h-1/6  bottom-0 left-0 right-0">
              <div className="bg-gray-400/30 flex justify-center absolute w-full z-20 h-full  backdrop-blur-sm">
              <div className="bg-blue-400 h-full aspect-square rounded-full -translate-y-1/2"></div>
              </div>
              <div className="bg-gray-400/30 absolute top-0 left-1/2 -translate-x-1/2   backdrop-blur-sm h-2/3 aspect-[2/1] rounded-t-full transform -translate-y-[calc(100%-1px)]"></div>
            </div>
          </div>
          <div className="bg-amber-200 flex-2/6 "> </div>

        </div>
        <div className="bg-green-500 flex-1/5">chosing game mode</div>
        <div className="bg-blue-500 flex-2/5">skins</div>
      </div>
        {children}
      </>

  );}