import React from 'react'

export default function SearchEngine({value, cValue,cClick} : {value : string, cValue: (e:React.ChangeEvent<HTMLInputElement>)=> void, cClick : ()=> void }) {
  return (
    <>
    <div className="mt-20 bg-white p-4 w-full flex flex-col items-center">
  <div className="flex flex-col md:flex-row justify-center w-full max-w-xl">
    <input
      type="text"
      value={value}
      onChange={cValue}
      className="border-b-2 mx-1 my-2 md:my-0 w-full md:w-96 border-b-[#2F3F27]"
    />
    <button
      className="bg-[#2F3F27] p-2 rounded text-white hover:cursor-pointer my-2 md:my-0"
      onClick={cClick}
    >
      Cari
    </button>
  </div>
</div>

    </>
  )
}
