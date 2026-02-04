"use client";

import { LoginButton } from "@/components/login-button";
import { DataTableColumnHeader } from "@/components/table/header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalize, formatCuil } from "@/lib/utils";
import type { User } from "@/types/users";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    id: "selección",
    header: ({ table }) => {
      const isAllSelected = table.getIsAllPageRowsSelected();
      const isSomeSelected = table.getIsSomePageRowsSelected();
      const semiChecked = isSomeSelected && !isAllSelected;

      return (
        <Checkbox
          checked={isAllSelected}
          semiChecked={semiChecked}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "CUIL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CUIL" />
    ),
    cell: ({ row }) => formatCuil(row.original.cuil),
    enableHiding: false,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
  },

  {
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.roles.map((rol) => (
          <Badge
            key={row.original.id + row.original.entorno + rol}
            variant="secondary"
            className="border-border"
          >
            {rol}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: "entorno",
    accessorKey: "entorno",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entorno" />
    ),
    cell: ({ row }) => capitalize(row.original.entorno),
  },
  {
    id: "equipo",
    accessorKey: "equipo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipo" />
    ),
    cell: ({ row }) => capitalize(row.original?.equipo),
  },
  {
    accessorKey: "acciones",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acciones" />
    ),
    meta: {
      headerClassName: "w-px",
      cellClassName: "w-px whitespace-nowrap",
    },
    enableSorting: false,
    enableGlobalFilter: false,
    cell: ({ row, table }) => {
      const backendLocal = table.options.meta?.backendLocal;
      return (
        <div className="flex w-fit gap-2">
          <LoginButton
            entorno={row.original.entorno}
            cuil={row.original.cuil}
            frontendLocal={false}
            backendLocal={backendLocal}
          />
          <LoginButton
            entorno={row.original.entorno}
            cuil={row.original.cuil}
            frontendLocal={true}
            backendLocal={backendLocal}
          />
        </div>
      );
    },
  },
];
