import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Plus } from "lucide-react"


export const GroupSidebar=()=>{
    return <nav className="h-full w-15 fixed left-0 bottom-0 top-15 sm:top-16 z-1 bg-primary flex flex-col items-center gap-y-3 py-4 overflow-y-scroll no-scrollbar">
        <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
            <AvatarFallback className="rounded-none"><Plus/></AvatarFallback>
        </Avatar>

        {/* Task map all groups here */}
        <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
            <AvatarImage src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=PN`}/>
            <AvatarFallback className="rounded-none">PN</AvatarFallback>
        </Avatar>
        <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
            <AvatarImage src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=AT4`}/>
            <AvatarFallback className="rounded-none">AT</AvatarFallback>
        </Avatar>
        
    </nav>
}