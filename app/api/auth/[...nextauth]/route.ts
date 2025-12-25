import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"


const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    session:{
        strategy:"jwt"
    },

    callbacks:{
        async signIn({user,account,profile}){
            if(account?.provider!=="google") return false;

            const googleProfile= profile as {
                email:string,
                name:string,
                picture:string,
                sub:string
            }

            await prisma.users.upsert({
                where:{
                    userId:googleProfile.sub
                },
                update:{
                    name:googleProfile.name,
                    avatar:googleProfile.picture,
                    lastLoginAt: new Date()
                },
                create:{
                    userId:googleProfile.sub,
                    avatar:googleProfile.picture,
                    email:googleProfile.email,
                    lastLoginAt:new Date(),
                    name:googleProfile.name
                }
            })

            return true;
        }
    }
});

export {handler as GET, handler as POST}