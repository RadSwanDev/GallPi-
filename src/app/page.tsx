/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
"use client"
import Card from "@/component/card";
import Navigation from "@/component/navigation";
import CardSkeleton from "@/component/UX/cardSkleton";
import { useWidth } from "@/context/context";
import { useEffect, useState } from "react";
export default function Home() {
  const [data,setData] = useState([])
  const widthDevice = useWidth()

  useEffect(()=>{
    const callApi = async()=>{
        const response = await fetch("https://pixabay.com/api/?key=49948897-656b16e360f245897e85c17ff&q=indonesian+girls&image_type=photo&pretty=true")
        const datas = await response.json()
        setData(datas.hits)
    }
    callApi()
  },[])
  if(!data){
    return( 
    <>
    <Navigation/>
    <div className={`columns-2 md:columns-4 gap-4 mt-20 p-4 h-full`}>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    <CardSkeleton/>
    </div>
    </>
    )
  }
  return (
  <>
  <Navigation/>

    <div className="mt-20 flex flex-col items-center">
      <div className="flex justify-center">
      <input type="text" className="border-b-2 mx-1 border-b-[#2F3F27]" />
      <button className="bg-[#2F3F27] p-2 rounded text-white hover:cursor-pointer " onClick={()=> alert("Project masih dalam pembangunan!")} disabled>Cari</button>
      </div>
      <p className="my-1 text-[#A7AE47] underline mt-2">DISCLAIMER: Input hanya dapat menerima dua kata saja!</p>
    </div>
  <div className={`columns-2 md:columns-4 gap-4 mt-5 p-4 h-full`}>
        {data.map((item : {
          webformatURL: string;id : number,user:string, username : string, likes : string, views : string, downloads : string, device : string, iconDevice : number,deviceGap : string
})=>{
          return(
            <div key={item.id}>
              <Card 
                  deviceGap = {widthDevice < 1024 ? "gap-4" : "gap-8"}
                  image={item.webformatURL}
                  device={widthDevice < 1024 ? "text-md" : "text-xl"}
                  username={item.user}
                  iconDevice={widthDevice < 1024 ? 20 : 40 } likes={item.likes} views={item.views} downloads={item.downloads}
              />
            </div>
         )
        })}
      </div> 
  </> 
  );
}
