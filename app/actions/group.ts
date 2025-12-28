"use server"

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache";

export async function fetchGroups(){
    const session = await getServerSession(authOptions);
    const userId= session?.user.id;
    const groups= await prisma.group.findMany({
        where:{
            members:{
                some:{
                    userId:userId
                }
            }
        },
        select:{
            groupId:true,
            groupName:true,
        }
    });
    return groups
}


export async function fetchGroupInfo(groupId:string) {
    const groupInfo= await prisma.group.findFirst({
        where:{
            groupId:groupId
        },
        select:{
            creatorId:true,
            groupName:true,
            members:{
                select:{
                    user:{
                        select:{
                            avatar:true,
                            name:true,
                            userId:true
                        }
                    }
                }
            }
        }
    });
    
    return groupInfo;
}


export async function createGroup(groupName:string){
    const session= await getServerSession(authOptions);
    if(!session?.user.id){
        throw new Error("Unauthorized");
    }
    const userId=session?.user.id;

    const group= await prisma.$transaction(async (tx)=>{
        const newGroup= await tx.group.create({
            data:{
                groupName,
                creatorId:userId,
            }
        })

        await tx.userGroup.create({
            data:{
                userId,
                groupId:newGroup.groupId
            }
        })

        return newGroup;
    })

    revalidatePath("/dashboard")

    return group;
}