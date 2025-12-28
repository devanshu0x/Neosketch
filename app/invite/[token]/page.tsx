import { Button } from "@/components/ui/button";
import { InviteActions } from "@/components/ui/inviteActions";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface InvitePageProps{
    params:{
        token:string;
    }
}

export default async function InvitePage({params}:InvitePageProps){
    const invite= await prisma.groupInvite.findUnique({
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
        <h3>Group Invitation!</h3>
        <p>You are invited to join group</p>
        <div>{invite.group.groupName}</div>
        <p>You were invited to join this group by <span>{invite.inviter.name}</span></p>
        <InviteActions inviteId={invite.id}/>
    </main>
}