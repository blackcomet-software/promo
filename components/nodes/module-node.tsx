import { AppWindow } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

export function ModuleNode() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-background p-6 border border-border shadow-sm rounded-lg flex flex-col justify-center items-center">
          <AppWindow className="size-8" />
          <span className="text-sm font-semibold tracking-tight">Website</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Add CMS</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
