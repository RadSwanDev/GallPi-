/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Card({image,username,likes,views,downloads,device,iconDevice,deviceGap} : {image : string, username : string, likes : string, views : string, downloads : string, device : string, iconDevice : number, deviceGap : string}) {
  return (
    <>
    <div className="bg-white p-4 mt-3 rounded break-inside-avoid">
    <img src={image} alt="jpg" className="w-full h-auto rounded" />  
    <p className={`flex items-center ${device} gap-2 my-2 font-semibold text-[#415936]`}>
        <img src="user (4).svg" alt="user" className="bg-[#547246] p-1 rounded-full" width={iconDevice} />
        {username}
    </p>
    <hr className="bg-[#547246]" />
    <div className={`flex ${deviceGap} mt-4 justify-center text-[#415936]`}>
        <p className="flex flex-col items-center"><img src="heart.svg" alt="heart" width={iconDevice} /> {likes}</p>
        <p className="flex flex-col items-center"><img src="eye (1).svg" alt="eye" width={iconDevice } />{views}</p>
        <p className="flex flex-col items-center"><img src="download.svg" alt="download" width={iconDevice} />{downloads}</p>
    </div>
    </div>
    </>
  )
}
