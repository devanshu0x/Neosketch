import { cardUrls } from "@/lib/constants";
import { Plus } from "lucide-react";

interface DesignCardProps{
    id:string;
    name:string;
}

function hashId(str: string, n: number): number {
  let hash = 2166136261;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) % n;
}


export const DesignCard= ({id,name}:DesignCardProps)=>{

    const n= cardUrls.length;
    const ind= hashId(id,n);
    
    return <div className="w-70 h-80 p-2 space-y-2 flex flex-col justify-center items-center">
        <div className="w-65 h-65 bg-accent rounded-md border-3 overflow-hidden flex justify-center items-center">
            {id==="0" ? 
                <Plus size={72}  className="opacity-50"/>
             :<img src={cardUrls[ind]} className="w-full h-full object-cover " alt="" />}
        </div>
        <div className="text-center font-medium">
            {name}
        </div>
    </div>

}