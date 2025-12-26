"use client";

import { useEffect, useState } from "react";

interface DebounceProps{
    value:string;
    delay:number;
}

export function useDebounce({value,delay}:DebounceProps){
    const [debouncedValue,setDebouncedValue]=useState(value);
    useEffect(()=>{
        const timeout= setTimeout(()=>setDebouncedValue(value),delay);

        return ()=>clearTimeout(delay);
    },[value,delay])

    return debouncedValue;
}