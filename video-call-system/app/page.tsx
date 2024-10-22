"use client";
import useUser from "@/hooks/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {v4 as uuid} from "uuid";  
export default function Home() {
  const { fullName, setfullName } = useUser();
  const [roomId, setroomId] = useState("");
  const router = useRouter();
  useEffect(() => {
    setfullName("");
  }, []);
  return (
    <div className="w-full h-screen font-[Poppins]">
      <section className="bg-gray-950 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 flex flex-col h-screen items-center gap-24">
          <Image src="/logo.svg" alt="logo" width={200} height={200} />
          <div className="mx-auto max-w-4xl text-center ">
            <h1 className="bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500 bg-clip-text text-transparent text-5xl font-bold">
             Important discussion karave हाय नम्रा विनंती
            </h1>
            <h1 className="bg-gradient-to-r from-red-600 via-yellow-400 to-orange-500 bg-clip-text text-transparent text-5xl font-bold">
            फालतू गिरी करने पर अघोर दंड
            </h1>
            <p className="mx-auto mt-6 max-w-xl sm:text-xl/relaxed">
              Cheers To Us for making it to 5th Sem
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 ">
              <input
                type="text"
                id="name"

                onChange={(e)=>setfullName(e.target.value.toString())}
                className="border rounded-md focus:outline-none focus:border-transparent w-full h-10 text-center cursor-pointer"
                placeholder="Enter your name"
              />
            </div>
            {fullName&&fullName.length>=3 && (
            <>
              <div className="flex items-center justify-center gap-4 mt-6">
              <input
                type="text"
                id="name"
                value={roomId}
                onChange={(e)=>setroomId(e.target.value)}
                className="border rounded-md focus:outline-none focus:border-transparent w-full h-10 text-center cursor-pointer"
                placeholder="Enter room Id to join a meeting"
              />
              <button className="rounded-md bg-blue-600 px-10 py-[11px] text-sm font-medium hover:bg-blue-800 duration-300" onClick={()=>router.push(`/room/${roomId}`)} disabled={!roomId}>
                Join
              </button>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <button className="text-lg font-medium hover:text-blue-400 hover:text-xl duration-300"
                  onClick={()=>router.push(`/room/${uuid()}`)}
                >
                  Or create a new meeting 
                </button>
              </div>
            </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
