"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react";

interface UsercardProps{
    userId:string;
    userName:string;
    avatar:string;
}

export const Usercard= ({userId,userName,avatar}:UsercardProps)=>{
    const session=useSession();
    const id=session.data?.user.id;
    return <div className="flex items-center gap-3 p-2 rounded-sm bg-primary">
        <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-sm text-primary-foreground">
            {userName+ (userId===id? " (You)":"")}
        </div>
    </div>
}