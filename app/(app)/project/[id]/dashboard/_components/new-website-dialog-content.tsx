"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useDialog } from "@/stores/dialog";

export function NewWebsiteDialogContent() {
  const setIsOpen = useDialog((state) => state.setIsOpen)
  const mutation = useMutation({
    mutationFn: async () => { 
      const supabase = createClient();
      await supabase.from("node").insert({ type: "website", x_coord: 0, y_coord: 0 })
    },
    onSuccess: () => setIsOpen(false)
  })
  return (
  <>
    <DialogHeader>
      <DialogTitle>New Website</DialogTitle>
      <DialogDescription>Lets get started with a new website</DialogDescription>
    </DialogHeader>
    <Label>URL</Label>
    <Input placeholder="https://exammple.com" />
    <Button 
        disabled={mutation.isPending} 
        onClick={() => mutation.mutate()}
    >
        {mutation.isPending ?<Spinner className="text-background" /> : "Confirm"}
    </Button>
  </>
  )
}
