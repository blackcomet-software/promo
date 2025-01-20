"use client";

import { revalidateCurrentPath } from "@/actions/revalidateCurrentPath";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { Ban } from "lucide-react";
import { useEffect, useState } from "react";

type Invite = {
  id: string,
  target_email: string,
  created_at: string,
}

export function PendingInvitesDialog(props: {pendingInvites: Invite[] }) {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
   if (props.pendingInvites.length === 0) {setOpen(false)} 
  }, [props.pendingInvites])

  return (
       <Dialog open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
          <DialogTrigger asChild>
        <Button variant="secondary" disabled={props.pendingInvites.length === 0}>Pending invites</Button>
        </DialogTrigger>
          <DialogContent onOpenAutoFocus={(event) => event.preventDefault()}>
             <TooltipProvider> 
            <DialogHeader>
              <DialogTitle>Pending invites</DialogTitle>
              <DialogDescription>These are the invites that have been send earlier by you</DialogDescription> 
            </DialogHeader>
            <div className="flex flex-col gap-2">
            {props.pendingInvites.map(invite => <PendingInviteCard key={invite.id} invite={invite} />)}
            </div>
            </TooltipProvider>
          </DialogContent>
        </Dialog>
  )
}

function PendingInviteCard(props: {invite: Invite}) {
   const mutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      await Promise.all([
        supabase.from("invite_to_project").delete().eq("id", props.invite.id),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ])
      revalidateCurrentPath()
    }
  }) 
  return (
    <Card  className="flex items-center justify-between py-2 px-3">
      <div>
        <p className="font-bold">{props.invite.target_email}</p>
        <p className="text-sm text-muted-foreground">{new Date(props.invite.created_at).toLocaleString()}</p>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="h-full" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            { mutation.isPending ? <Spinner /> : <Ban />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Revoke</p>
        </TooltipContent>
      </Tooltip>
    </Card>
  )
} 
