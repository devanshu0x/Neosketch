"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import crypto from "crypto"
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";



export async function createInvite(email:string, groupId:string){
    const session= await getServerSession(authOptions);
    if(!session?.user.id){
        throw new Error("Unauthorized");
    }

    const token=crypto.randomUUID();
    
    await prisma.groupInvite.create({
        data:{
            email,
            groupId,
            token,
            inviterId:session.user.id,
            expiresAt: new Date(Date.now() + 1000*60*60*24)
        }
    })
    return `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;

}

export async function acceptInvite(inviteId:string) {
    const session= await getServerSession(authOptions);
    if(!session?.user.id){
        throw new Error("Unauthorized");
    }

    const invite= await prisma.groupInvite.findFirst({
        where:{
            id:inviteId
        }
    })

    if(!invite){
        throw new Error("Invite not found");
    }

    const user=await prisma.user.findFirst({
        where:{
            email:invite.email
        },
        include:{
            groups:true
        }
    })

    if(user?.groups.find((group)=>group.groupId===invite.groupId)){
        throw new Error("You are already in that group");
    }


    await prisma.$transaction(async (tx)=>{
        await tx.userGroup.create({
            data: {
                userId:session.user.id,
                groupId: invite.groupId
            }
        })

        await tx.groupInvite.delete({
            where:{
                id:inviteId
            }
        })
    })

    redirect(`/dashboard?groupId=${invite.groupId}`)
}

export async function declineInvite(inviteId: string) {
  await prisma.groupInvite.delete({
    where: { id: inviteId },
  });

  redirect("/dashboard");
}
