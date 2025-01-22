"use client";
import { useDialog } from "@/stores/dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NewWebsiteDialogContent } from "./new-website-dialog-content";

export function DialogManager() {
  const isOpen = useDialog((state) => state.isOpen)
  const setIsOpen = useDialog((state) => state.setIsOpen)
  const type = useDialog((state) => state.type)
  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogContent>
       {type === "website" && <NewWebsiteDialogContent />}
      </DialogContent>
    </Dialog>
  )
}
