"use client";

import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react"

interface ProvidersProps{
    children:React.ReactNode
}

export const Providers = ({children}:ProvidersProps)=>{
    return (
        <>
        <SessionProvider>
            <Toaster position="top-center" />
            {children}
        </SessionProvider>
        </>
    )
}