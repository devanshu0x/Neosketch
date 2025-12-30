"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function fetchProjects(groupId:string){
    const projects= await prisma.project.findMany({
        where:{
            groupId:groupId
        }
    })
    return projects;
}

export async function createProject(groupId:string, projectName:string){
    await prisma.project.create({
        data:{
            projectName:projectName,
            groupId:groupId
        }
    })
    revalidatePath(`/dashboard?groupId=${groupId}`);
}