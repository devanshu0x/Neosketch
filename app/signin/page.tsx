"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Signin(){
    const searchParams= useSearchParams();
    const callbackUrl= searchParams.get("callbackUrl") || "/dashboard";
    return <main>
        <div className="py-18  flex justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Use your google account to sign in</CardDescription>
                </CardHeader>
                <CardContent >
                    <Button variant={"outline"} className="w-full"
                    onClick={()=>signIn("google",{callbackUrl: callbackUrl})}
                    > 
    <img
        src="/google.svg"
        alt="Google"
        className="h-5 w-5"
      />
      <span className="text-sm font-medium">
        Continue with Google
      </span></Button>
                </CardContent>
            </Card>
        </div>
    </main>
}