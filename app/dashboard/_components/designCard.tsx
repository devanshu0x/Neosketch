"use client";
import { createProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cardUrls } from "@/lib/constants";
import { Plus } from "lucide-react";
import { useState } from "react";

interface DesignCardProps{
    id:string;
    name:string;
    groupId?:string;
}

function hashId(str: string, n: number): number {
  let hash = 2166136261;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) % n;
}


export const DesignCard= ({id,name,groupId}:DesignCardProps)=>{

    const n= cardUrls.length;
    const ind= hashId(id,n);

    const [projectName,setProjectName]=useState<string>("");

    if(id==="0"){
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <div className="w-70 h-80 p-2 space-y-2 flex flex-col justify-center items-center">
        <div 
         className="group w-65 h-65 bg-accent hover:bg-accent/40 hover:border-border/40 rounded-md border-3 overflow-hidden flex justify-center items-center transition-colors duration-300">
                <Plus size={72}  className="opacity-50 group-hover:opacity-30 transition-colors duration-300"/>
        </div>
        <div className="text-center font-medium">
            {name}
        </div>
    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Create Project
                        </DialogTitle>
                        <DialogDescription>
                            Create new project board
                        </DialogDescription>
                    </DialogHeader>
                    <Label>Enter Project Name</Label>
                    <Input value={projectName} onChange={(e)=>setProjectName(e.target.value)} placeholder="My First Board" />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"}>Close</Button>
                        </DialogClose>
                        <Button onClick={async ()=> await createProject(groupId!,projectName)} >Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    
    return <div className="w-70 h-80 p-2 space-y-2 flex flex-col justify-center items-center">
        <div 
         className="group w-65 h-65 bg-accent hover:bg-accent/40 hover:border-border/40 rounded-md border-3 overflow-hidden flex justify-center items-center transition-colors duration-300">
             <img src={cardUrls[ind]} className="w-full h-full object-cover " alt="" />
        </div>
        <div className="text-center font-medium">
            {name}
        </div>
    </div>

}