"use client";

import { ColumnDef } from "@tanstack/react-table";

type ProjectMemberEntry = {
  name: string;
  email: string;
};

export const columns: ColumnDef<ProjectMemberEntry>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
