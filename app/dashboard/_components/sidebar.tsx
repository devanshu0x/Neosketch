import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Usercard } from "./usercard"

export const Sidebar= ()=>{
    return <aside className="hidden md:flex bg-sidebar h-full fixed left-0 w-75 pl-17  flex-col gap-y-2 p-4">
        <div className="my-6 text-center uppercase font-bold text-accent-foreground  text-xl underline">
            Welcome Pankaj!
        </div>
        <hr/>
        <h3 className="text-sm text-foreground">Selected Group</h3>
        <div className="flex items-center gap-2 border py-1 px-2 rounded-md bg-primary text-primary-foreground">
            <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
                <AvatarImage src={"subaru.jpeg"}/>
                <AvatarFallback className="rounded-none text-primary">GP</AvatarFallback>
            </Avatar>
            <p className="font-bold text-center">Pokemon Master Roadmap</p>
        </div>

        <h3 className="mt-8 text-sm text-foreground">Member Management</h3>
        <Button variant={"outline"}>Invite Member</Button>
        <ul className="mt-2 space-y-2 overflow-y-scroll no-scrollbar">
            <li>
                <Usercard/>
            </li>
            <li>
                <Usercard/><aside></aside>
            </li>
            <li>
                <Usercard/>
            </li>
            <li>
                <Usercard/>
            </li>
            <li>
                <Usercard/>
            </li>
            <li>
                <Usercard/>
            </li>
            <li>
                <Usercard/>
            </li>
            <li>
                <Usercard/>
            </li>
            <li>
                <Usercard/>
            </li>
        </ul>
    </aside>
}