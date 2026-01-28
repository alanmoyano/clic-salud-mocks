"use client";

import { getLoginUrl } from "@/api/login";
import { BadgeRoles } from "@/components/table/tag";
import { Button } from "@/components/ui/button";
import { capitalize, formatCuil } from "@/lib/utils";
import type { User } from "@/types/users";
import type { ColumnDef } from "@tanstack/react-table";
import { GlobeIcon, MonitorDownIcon } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "cuil",
    header: "CUIL",
    cell: ({ row }) => formatCuil(row.original.cuil),
  },
  {
    accessorKey: "roles",
    header: "Roles",
    cell: ({ row }) => <BadgeRoles roles={row.original.roles} />,
  },
  {
    accessorKey: "entorno",
    header: "Entorno",
    cell: ({ row }) => capitalize(row.original.entorno),
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    meta: {
      headerClassName: "w-px",
      cellClassName: "w-px whitespace-nowrap",
    },
    enableGlobalFilter: false,
    cell: ({ row, table }) => {
      const backendLocal = table.options.meta?.backendLocal;
      return (
        <div className="flex w-fit gap-2">
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a
                href={getLoginUrl({
                  entorno: row.original.entorno,
                  cuil: row.original.cuil,
                  frontendLocal: false,
                  backendLocal,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon />
                Iniciar sesión en{" "}
                <strong>{row.original.entorno} desplegado</strong>
              </a>
            }
          />

          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a
                href={getLoginUrl({
                  entorno: row.original.entorno,
                  cuil: row.original.cuil,
                  frontendLocal: true,
                  backendLocal,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MonitorDownIcon />
                Iniciar sesión en <strong>{row.original.entorno} local</strong>
              </a>
            }
          />
        </div>
      );
    },
  },
];
