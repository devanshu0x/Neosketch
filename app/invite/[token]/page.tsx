import { InviteActions } from "@/components/ui/inviteActions";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface InvitePageProps{
    params:{
        token:string;
    }
}

export default async function InvitePage({params}:InvitePageProps){
    const invite= await prisma.groupInvite.findFirst({
        where:{
            token:params.token
        },
        include:{
            group:true,
            inviter:true
        }
    })

    if(!invite || invite.expiresAt< new Date()){
        notFound();
    }

    return <main>
        <h3 className="text-xl sm:text-2xl md:text-3xl text-center py-4 font-semibold">Group Invitation!</h3>
        <p className="text-center mt-8 mb-4 sm:mb-8 sm:text-xl">You’ve been invited to join the group</p>
        <div className="my-4 text-center">
            
            <span className="px-7 py-2 bg-chart-2 text-white font-bold sm:text-xl rounded-full">
                {invite.group.groupName}
            </span>
        </div>
        <div className="text-center my-8" >You were invited to join this group by <span className="font-semibold">{invite.inviter.name}</span></div>
        <InviteActions inviteId={invite.id}/>
    </main>
}