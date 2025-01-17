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
    cell: ({ row }) => (
      <div className="flex flex-row gap-2">
        {row.original.roles.map(x => <Badge key={x}>{x}</Badge>)}
      </div>
    )
  }
];
