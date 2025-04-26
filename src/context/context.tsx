"use client"
import { useContext, createContext, useState, useEffect, ReactNode } from "react";

const WidthContext = createContext(0);

export function WidthContextProvider({children}:{children : ReactNode}){
    const [width,setWidth] = useState(0)
    
  useEffect(()=>{
    const setSize = ()=> setWidth(window.innerWidth)
    
    window.addEventListener("resize",setSize)
    return ()=>{
      window.removeEventListener("resize",setSize)
    }
},[])

    return(
        <WidthContext.Provider value={width}>
            {children}
        </WidthContext.Provider>
    )
}

export function useWidth(){
    return useContext(WidthContext)
}