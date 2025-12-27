import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export const Usercard= ()=>{
    return <div className="flex items-center gap-3 p-2 rounded-sm bg-primary">
        <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback>UI</AvatarFallback>
        </Avatar>
        <div className="text-sm text-primary-foreground">
            Usename
        </div>
    </div>
}