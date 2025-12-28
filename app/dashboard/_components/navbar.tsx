"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { LogOut, Plus, UserRound } from "lucide-react";
import { Skeleton } from "../../../components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { InviteDialog } from "./inviteDialog";

interface NavbarProps{
    selectedGroupId:string | null;
}

export const Navbar = ({selectedGroupId}:NavbarProps) => {
    const session = useSession();

    if(session.status==='loading' ){
        return <nav className="z-10 bg-primary flex justify-between items-center py-2 px-4 shadow-[0_1px_4px_0px_rgba(0,0,0,0.1)]">
            <div className="flex space-x-6 items-center">
                    <img src="logo.svg" className="h-11 sm:h-12 cursor-pointer " alt="logo" />
                    <Skeleton className="w-50 h-8 hidden sm:block"/>
            </div>
            <div>
                <Skeleton className="w-20 sm:w-60 h-8"/>
            </div>
        </nav>
    }
   
    return <nav className="z-10 bg-primary flex justify-between items-center py-2 px-4 shadow-[0_1px_4px_0px_rgba(0,0,0,0.1)]">

        <div className="flex space-x-6 items-center">
            <img src="logo2.png" className="h-11 sm:h-12 cursor-pointer " alt="logo" />
            
        </div>
        <div className="space-x-2 md:space-x-3 flex">
            {session.status === "authenticated" ?(
                <>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="border bg-background sm:border-0" variant={"ghost"}><Plus/> <span className="hidden sm:block">Invite Members</span></Button>
                    </DialogTrigger>
                    {selectedGroupId && <InviteDialog groupId={selectedGroupId} />}
                </Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={session.data.user?.image ?? ""}/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-4 w-46">
                        <DropdownMenuItem>
                            <UserRound/>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={()=>signOut()}>
                            <LogOut/>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                </>
            ):
                <Button onClick={() => signIn()}>Sign in</Button>
            }
        </div>
    </nav>
}