/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

export default function Card({
  image,
  username,
  likes,
  views,
  downloads,
  device,
  iconDevice,
  deviceGap
}: {
  image: string;
  username: string;
  likes: string;
  views: string;
  downloads: string;
  device: string;
  iconDevice: number;
  deviceGap: string;
}) {
  const [onSelect, setOnSelect] = useState(false);

  return (
    <div
      className= {`bg-white ${device} ${deviceGap} shadow-md hover:shadow-xl p-1 mt-3 rounded break-inside-avoid hover:cursor-pointer`}
      onMouseEnter={() => setOnSelect(true)}
      onMouseLeave={() => setOnSelect(false)}
    >
      <div className="relative">
        <img
          src={image}
          alt="jpg"
          className="w-full h-auto rounded transition duration-300 ease-in-out hover:brightness-50"
        />
        {onSelect && (
          <>
            <div className="absolute top-0 left-0 right-0 flex justify-between text-white text-sm font-bold p-2 z-10">
              <p className='flex align-middle gap-2 items-center'><img src={"user (4).svg"} width={iconDevice}/>{username}</p>
              <p className='flex align-middle gap-2 items-center'> <img src={"heart.svg"} width={iconDevice}/>{likes}</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-white font-bold p-2 z-10">
              <p className='flex align-middle gap-2 items-center'><img src="eye.svg" alt="" width={iconDevice}/>{views}</p>
              <p className='flex align-middle gap-2 items-center'><img src="download.svg" alt="" width={iconDevice}/>{downloads}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
