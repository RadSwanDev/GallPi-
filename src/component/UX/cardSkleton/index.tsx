import React from 'react'

export default function CardSkeleton() {
  return (
    <div className="bg-[#7BA267] p-4 mt-3 rounded break-inside-avoid animate-pulse">
      <div className="w-full h-48 bg-[#547246] rounded"></div>
      
      <div className="flex items-center gap-2 my-2">
        <div className="bg-[#547246] p-2 rounded-full w-8 h-8"></div>
        <div className="h-4 bg-[#547246] rounded w-1/2"></div> 
      </div>
      
      <hr className="bg-[#547246]" />
      
      <div className="flex gap-8 mt-4 justify-center text-[#415936]">
    
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-[#547246] rounded"></div>
          <div className="h-3 bg-[#547246] rounded w-6 mt-1"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-[#547246] rounded"></div>
          <div className="h-3 bg-[#547246] rounded w-6 mt-1"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-[#547246] rounded"></div>
          <div className="h-3 bg-[#547246] rounded w-6 mt-1"></div>
        </div>
      </div>
    </div>
  )
}
