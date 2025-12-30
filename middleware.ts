import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest){
    const {pathname}=request.nextUrl;
    if(pathname==="/" ||
    pathname==="/signin" || 
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp")
){
        return NextResponse.next();
    }

    const isLoggedIn =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

    if(!isLoggedIn){
        const loginUrl=new URL("/signin",request.url);
        loginUrl.searchParams.set("callbackUrl",request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}