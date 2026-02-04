"use client";

import { UserTableProvider } from "@/components/providers/user-table-provider";
import { DataTable } from "@/components/table/data-table";
import type { User } from "@/types/users";
import type { ColumnDef } from "@tanstack/react-table";

export function UsersTable({
  data,
  columns,
}: {
  data: User[];
  columns: ColumnDef<User>[];
}) {
  return (
    <UserTableProvider data={data} columns={columns}>
      <DataTable />
    </UserTableProvider>
  );
}
