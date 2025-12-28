"use client";

import { acceptInvite, declineInvite } from "@/app/actions/groupInvite";
import { Button } from "@/components/ui/button";

export function InviteActions({ inviteId }: { inviteId: string }) {
  return (
    <div className="flex gap-2">
      <Button onClick={() => acceptInvite(inviteId)}>
        Join Group
      </Button>

      <Button variant="outline" onClick={() => declineInvite(inviteId)}>
        Decline
      </Button>
    </div>
  );
}
