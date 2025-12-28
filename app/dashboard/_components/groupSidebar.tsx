"use client";

import { createGroup } from "@/app/actions/group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarImage } from "@radix-ui/react-avatar"
import { Plus } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface GroupSidebarProps{
    groups:{groupId:string, groupName:string }[];
    selectedGroupId:string | null;
}


export const GroupSidebar=({groups,selectedGroupId}:GroupSidebarProps)=>{

    const [newGroup,setNewGroup]=useState<string>("");
    const [open,setOpen]=useState<boolean>(false);
    const router=useRouter();
    const searchParams=useSearchParams();

    async function createGroupHandler(){
        await createGroup(newGroup);
        setNewGroup("");
        setOpen(false);
    }

    function groupChange(groupId:string){
        const params=new URLSearchParams(searchParams.toString());
        params.set("groupId",groupId);
        router.push(`/dashboard?${params.toString()}`);
    }

    return <nav className="h-full w-15 fixed left-0 bottom-0 top-15 sm:top-16 z-1 bg-primary flex flex-col items-center gap-y-3 py-4 overflow-y-scroll no-scrollbar">
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
                    <AvatarFallback className="rounded-none"><Plus/></AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent className="sm:max-w-105">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>Create a new project in this group</DialogDescription>
                </DialogHeader>
                <Label>Enter Group name</Label>
                <Input type="text" placeholder="Group Name" value={newGroup} onChange={(e)=>setNewGroup(e.target.value)} />
                <DialogFooter>
                <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button onClick={createGroupHandler} >Create</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>

        <ul className="space-y-3">
            {groups.map((group)=>{
                return <li key={group.groupId}>
                    <Avatar onClick={()=>{groupChange(group.groupId)}} className={`w-10 h-10 rounded-lg border-2 ${group.groupId===selectedGroupId? "border-amber-200" :"border-primary-foreground"}`}>
                        <AvatarImage src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${group.groupId}`}/>
                        <AvatarFallback className="rounded-none">{group.groupName.slice(0,1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </li>
            })}
        </ul>
        
        
    </nav>
}