"use client"

import { createInvite } from "@/app/actions/groupInvite";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface InviteDialogProps{
    groupId:string;
}

function openGmailInvite(inviteLink:string){
    const subject=encodeURIComponent(
        `Invitation to join Neosketch group`
    )

    const body=encodeURIComponent(
        `Hey 👋\n\nYou've been invited to join the group.\n\n` +
    `Click the link below to view the invite:\n\n${inviteLink}\n\n` +
    `— Sent from Neosketch`
    )
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
    window.open(gmailUrl,"_blank")
}

export function InviteDialog({groupId}:InviteDialogProps){

    const [email,setEmail]=useState<string>("");
    async function sendInvitation(){
        const invitationUrl= await createInvite(email,groupId);
        openGmailInvite(invitationUrl);
    }
    return <DialogContent className="sm:max-w-105">
        <DialogHeader>
            <DialogTitle>Send Invitation</DialogTitle>
            <DialogDescription>Invite other people to this group</DialogDescription>
        </DialogHeader>
        <Label>Enter email address</Label>
        <Input placeholder="john@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button onClick={sendInvitation}>Send Invitation</Button>
        </DialogFooter>
    </DialogContent>
}