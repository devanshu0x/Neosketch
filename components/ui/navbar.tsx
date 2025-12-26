"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { ProjectSelector } from "./projectSelector";


export const Navbar = () => {
    const session = useSession();
   
    return <nav className="flex justify-between items-center py-2 px-4 shadow-[0_1px_4px_0px_rgba(0,0,0,0.1)]">

        <div className="flex space-x-6 items-center">
            <img src="logo.svg" className="h-11 sm:h-12 cursor-pointer " alt="logo" />
            <ProjectSelector/>
        </div>

        <div className="space-x-2 flex">
            {session.status === "authenticated" ?(
                <>
                <Avatar>
                    <AvatarImage src={session.data.user?.image ?? ""}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                </>
            ):
                <Button onClick={() => signIn()}>Sign in</Button>
            }
        </div>
    </nav>
}