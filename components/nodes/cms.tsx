"use client"

import { Rss } from "lucide-react";
import { useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CmsNode(props: NodeProps<Node>) {
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <>
    <ContextMenu>
      <ContextMenuTrigger>
        <div draggable aria-pressed={props.dragging} className="bg-background size-20 border border-border aria-pressed:border-foreground shadow-sm rounded-lg flex flex-col justify-center items-center">
          <Rss className="size-8" />
          <span className="text-sm font-semibold tracking-tight">CMS</span>
            <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => console.log("Fake delete")}>Delete</ContextMenuItem>
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
              setOpenDialog(false);
            }}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  );
}
