import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus } from "lucide-react"


export const GroupSidebar=()=>{
    return <nav className="h-full w-15 fixed left-0 z-1 bg-primary flex flex-col items-center gap-y-3 py-4">
        <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
            <AvatarFallback className="rounded-none"><Plus/></AvatarFallback>
        </Avatar>

        {/* Task map all groups here */}
        <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
            <AvatarFallback className="rounded-none">PN</AvatarFallback>
        </Avatar>
        <Avatar className="w-10 h-10 rounded-lg border-2 border-primary-foreground">
            <AvatarFallback className="rounded-none">AT</AvatarFallback>
        </Avatar>
        
    </nav>
}