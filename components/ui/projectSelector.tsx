import { useState } from "react"
import { Popover } from "./popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./command";

const projects=[{id:1,title:"CP-31"}, {id:2,title:"Pokemon Master Roadmap"}, {id:3,title:"Js mastery roadmap"},{id:4,title:"Pokemon Master Roadmap 2"}, {id:5,title:"Js mastery roadmap 2"},{id:6,title:"Pokemon Master Roadmap x"}, {id:7,title:"Js mastery roadmap 20"}]


export const ProjectSelector=()=>{
    const [open,setOpen]= useState<boolean>(false);
    const [value,setValue]=useState<string>("");

    function trimTitle(title:string,len:number){
        if(title.length<=len) return title;
        return title.slice(0,len-1)+"..";
    }
    
    return <div>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className=" justify-between w-50">
                    {value ? trimTitle(value,19) : "Select Project" }
                    <ChevronsUpDown className="opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-50 border mt-2 rounded-md">
                <Command>
                    <CommandInput className="h-9" placeholder="Search Project..." ></CommandInput>
                    <CommandList className="p-1">
                        <CommandEmpty >No project Found</CommandEmpty>
                        <CommandGroup>
                            <CommandItem className="justify-between">Create Project
                                <span className="p-1 bg-accent rounded-sm">
                                    <Plus/>
                                </span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator/>
                        <CommandGroup >
                            {
                                projects.map((project)=>(
                                    <CommandItem
                                    key={project.id}
                                    value={project.title}
                                    onSelect={(currentValue)=>{
                                        setValue(value===currentValue? "": currentValue)
                                        setOpen(false)
                                    }}
                                    >
                                        {project.title}
                                        {project.title===value && <Check></Check>}
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </div>
}