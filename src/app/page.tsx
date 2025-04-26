/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
"use client"
import Card from "@/component/card";
import Navigation from "@/component/navigation";
import CardSkeleton from "@/component/UX/cardSkleton";
import { useWidth } from "@/context/context";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const [data,setData] = useState<{
    webformatURL : string;
    id : number;
    user:string; 
    username : string; 
    likes : string;
    views : string; 
    downloads : string;
    device : string, 
    iconDevice : number,deviceGap : string
  }[]>([])
  const [isFetching,setIsFetching] = useState(false)
  const lastTriggerPoint = useRef(null)
  const widthDevice = useWidth()
  const [page,setPage] = useState(1)

  const callApi = async(currentPage : number)=>{
    if(isFetching) return;
    setIsFetching(true)
    try{
      const response = await fetch(`https://pixabay.com/api/?key=49948897-656b16e360f245897e85c17ff&q=chinese+girls&image_type=photo&pretty=true&page=${currentPage}`)
    const datas = await response.json()
    setData((prevData)=> [...prevData, ...datas.hits])
    setPage((prevPage)=> prevPage + 1)
  }catch(error){
      console.error("Error fetchin fata:",error)
    }finally{
      setIsFetching(false)
    }
  }
  useEffect(()=>{
    callApi(page)
  },[])


  useEffect(()=>{
    const observer = new IntersectionObserver(
      (entries) =>{
        const target = entries[0];
        if(target.isIntersecting && !isFetching){
          callApi(page)
        }
      },{
        root : null,
        rootMargin : '20px',
        threshold : 0.1
      }
    )
    if(lastTriggerPoint.current){
      observer.observe(lastTriggerPoint.current)
    }

    return()=>{
      if(lastTriggerPoint.current){
        observer.unobserve(lastTriggerPoint.current)
      }
    }
  },[callApi,isFetching,page])

  if(!data.length && isFetching){
    return( 
    <>
    <Navigation/>
    <div className={`columns-2 md:columns-4 gap-4 mt-20 p-4 h-full`}>
    {
      Array(12).fill(null).map((_,index)=>(
        <CardSkeleton key={index++}/>
      ))
    }
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
},index)=>{
          return(
            <div key={index++}>
              <Card 
                  deviceGap = {widthDevice < 1024 ? "gap-4" : "gap-8"}
                  image={item.webformatURL}
                  device={widthDevice < 1024 ? "text-md" : "text-xl"}
                  username={item.user}
                  iconDevice={widthDevice < 1024 ? 20 : 40 } likes={item.likes ? item.likes.toString() : "0"} views={item.views ?  item.views.toString() : "0"} downloads={item.downloads ? item.downloads.toString() : "0"}
              />
            </div>
         )
        })}

        {
          isFetching && 
                <>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                </>
        }
        <div ref={lastTriggerPoint}></div>
      </div> 
  </> 
  );
}
