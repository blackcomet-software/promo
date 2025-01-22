"use client"
import { AppWindow } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { createClient } from "@/lib/supabase/client";
import { useDialog } from "@/stores/dialog";

type WebsiteNode = Node<{
  addNode: () => void,
  delete: () => void
}>

async function deleteWebsiteNode(id: string) {
  const supabase = createClient();
  await supabase.from("node").delete().eq("id", id)
} 

export function ModuleNode(props: NodeProps<WebsiteNode>) {
  const [openDialog, setOpenDialog] = useState(false)
  const open = useDialog(state => state.open)
  return (
    <>
    <ContextMenu>
      <ContextMenuTrigger>
        <div draggable aria-pressed={props.dragging} onClick={() => open("website")} className="cursor-pointer bg-background size-20 border border-border aria-pressed:border-foreground shadow-sm rounded-lg flex flex-col justify-center items-center relative">
      
          <AppWindow className="size-8" />
          <span className="text-sm font-semibold tracking-tight">Website</span>
            <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => setOpenDialog(true)}>Add CMS</ContextMenuItem>
        <ContextMenuItem onClick={() => deleteWebsiteNode(props.id)}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
<Dialog open={openDialog} onOpenChange={(newOpen) => setOpenDialog(newOpen)}>
<DialogContent>
            <DialogHeader>
              <DialogTitle>Add CMS</DialogTitle>
            </DialogHeader>

              <div className="grid w-full items-center gap-1.5">


            <Label>Connected Website</Label>
            <Input disabled placeholder="https://edelbouw.nl"/>
            </div>
            <DialogFooter>
            <Button onClick={() => {
              props.data.addNode()
              setOpenDialog(false);
            }}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
}
