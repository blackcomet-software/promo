"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

type ProjectMemberEntry = {
  name: string;
  roles: string[];
};

export const columns: ColumnDef<ProjectMemberEntry>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ cell }) => <div className="flex flex-row gap-2">{cell.getValue().map(x => <Badge key={x}>{x}</Badge>)}</div>
  },
];
