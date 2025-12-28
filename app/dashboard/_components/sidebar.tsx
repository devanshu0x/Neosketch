"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Usercard } from "./usercard"
import { useEffect, useState } from "react";
import { fetchGroupInfo } from "@/app/actions/group";

interface SidebarProps{
    selectedGroupId:string | null;
}

interface Member{
        user: {
            userId: string;
            name: string;
            avatar: string;
        };
}

export const Sidebar= ({selectedGroupId}:SidebarProps)=>{
    const [members,setMembers]=useState<Member[]>([]);
    const [groupName,setGroupName]=useState<string>("Select Group first");
    useEffect(()=>{
        async function fetchGroup(){
            if(selectedGroupId){
            const groupInfo=await fetchGroupInfo(selectedGroupId);
            console.log(groupInfo);
            if(groupInfo){
                setGroupName(groupInfo.groupName);
                setMembers(groupInfo.members)
            }
            }
        }
        fetchGroup();
        
    },[selectedGroupId])

    return <aside className="hidden md:flex bg-sidebar h-full fixed left-0 bottom-0 top-16 w-75 pl-17  flex-col gap-y-2 p-4">
        <h3 className="text-sm text-center text-foreground">Selected Group</h3>
        <div className="flex items-center gap-2 border py-1 px-2 rounded-md bg-primary text-primary-foreground">
            <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
                <AvatarImage src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${selectedGroupId? selectedGroupId: "null"}`}/>
                <AvatarFallback className="rounded-none text-primary">GP</AvatarFallback>
            </Avatar>
            <p className="font-bold text-center">{groupName}</p>
        </div>

        <h3 className="mt-5 text-center text-sm text-foreground">Member Management</h3>
        <Button variant={"outline"}>Invite Member</Button>
        <ul className="mt-2 space-y-2 overflow-y-scroll no-scrollbar">
           {members.map((member)=>(
            <li key={member.user.userId}>
                <Usercard userId={member.user.userId} userName={member.user.name} avatar={member.user.avatar} />
            </li>
           ))}
        </ul>
    </aside>
}