"use client";

import { acceptInvite, declineInvite } from "@/app/actions/groupInvite";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function InviteActions({ inviteId }: { inviteId: string }) {
  return (
    <div className="flex justify-center gap-8">
      <Button onClick={async () =>{
        try{
          await acceptInvite(inviteId)
          toast.success("Joined group successfully")
        }catch(err:any){
          toast.error(err.message);
        }
      }}>
        Join Group
      </Button>

      <Button variant="destructive" onClick={async () =>{
        await declineInvite(inviteId)
        toast.success("Rejected Invitation")
      }}>
        Decline
      </Button>
    </div>
  );
}
