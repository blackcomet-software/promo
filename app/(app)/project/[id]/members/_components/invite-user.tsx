"use client";

import { inviteUser } from "@/actions/invite";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function InviteUserDialog(props: {projectId: string}) {
  const inviteUserWithProjectId = inviteUser.bind(null, props.projectId)
  return (
     <Dialog>
        <DialogTrigger asChild>
          <Button>Invite a user</Button>
        </DialogTrigger>
        <DialogContent>
            <form action={inviteUserWithProjectId}>
          <DialogHeader>
            <DialogTitle>Invite a member to the project</DialogTitle>
            <DialogDescription>Please enter the email address of the user you wish to invite to collaborate on this project.</DialogDescription>
          </DialogHeader>
          <Input placeholder="Email" name="email" className="my-4" />
          <DialogFooter> 
              <Button>Invite</Button>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>

          </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>
  )
}
