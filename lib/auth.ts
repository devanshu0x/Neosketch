import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import prisma from "./prisma";


export const authOptions:NextAuthOptions={
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
        async jwt({token,account,profile}){
            // first login
            if(account && profile){
                token.sub=profile.sub;
            }
            return token;

        },

        async session({session,token}){
            if(session.user){
                session.user.id=token.sub as String;
            }
            return session;
        },


        async signIn({user,account,profile}){
            if(account?.provider!=="google") return false;

            const googleProfile= profile as {
                email:string,
                name:string,
                picture:string,
                sub:string
            }

            await prisma.user.upsert({
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
                    createdAt:new Date(),
                    name:googleProfile.name
                }
            })

            return true;
        }
    }
}