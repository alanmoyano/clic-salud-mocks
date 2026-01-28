"use client";

import { getLoginUrl } from "@/api/login";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCuil } from "@/lib/utils";
import { isUser, type User } from "@/types/users";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  type ColumnDef,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ClipboardIcon,
  ClipboardMinusIcon,
  GlobeIcon,
  MonitorDownIcon,
} from "lucide-react";
import { useState } from "react";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const fuzzyFilter: FilterFn<User> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function UserTable({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  backendLocal,
}: {
  data: User[];
  columns: ColumnDef<User>[];
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;
  backendLocal: boolean;
}) {
  "use no memo";

  const table = useReactTable({
    data,
    columns,
    globalFilterFn: fuzzyFilter,
    state: {
      globalFilter,
    },
    meta: {
      backendLocal,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  const [selectedRow, setSelectedRow] = useState<User>();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border">
      <ContextMenu onOpenChange={setMenuOpen}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(meta?.headerClassName)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <ContextMenuTrigger
                  key={row.id}
                  onContextMenu={() => {
                    if (!isUser(row.original)) return;

                    setSelectedRow(row.original);
                  }}
                  render={
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className={cn(
                        "duration-0",
                        menuOpen &&
                          selectedRow?.cuil === row.original.cuil &&
                          selectedRow?.entorno === row.original.entorno &&
                          "bg-muted/50",
                      )}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const meta = cell.column.columnDef.meta;
                        return (
                          <TableCell
                            key={cell.id}
                            className={cn(meta?.cellClassName)}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  }
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ContextMenuContent>
          {selectedRow && (
            <>
              <ContextMenuGroup>
                <ContextMenuLabel>URLs</ContextMenuLabel>
                <ContextMenuItem
                  onClick={() => {
                    copyToClipboard(
                      getLoginUrl({
                        entorno: selectedRow.entorno,
                        cuil: selectedRow.cuil,
                        frontendLocal: false,
                        backendLocal,
                      }),
                    );
                  }}
                >
                  <GlobeIcon className="size-4" />
                  Copiar URL de{" "}
                  <strong>{selectedRow?.entorno} desplegado</strong>
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    copyToClipboard(
                      getLoginUrl({
                        entorno: selectedRow.entorno,
                        cuil: selectedRow.cuil,
                        frontendLocal: true,
                        backendLocal,
                      }),
                    );
                  }}
                >
                  <MonitorDownIcon className="size-4" />
                  Copiar URL de <strong>{selectedRow?.entorno} local</strong>
                </ContextMenuItem>
              </ContextMenuGroup>

              <ContextMenuSeparator />

              <ContextMenuGroup>
                <ContextMenuLabel>CUIL</ContextMenuLabel>
                <ContextMenuItem
                  onClick={() => {
                    copyToClipboard(selectedRow.cuil);
                  }}
                >
                  <ClipboardIcon className="size-4" />
                  Copiar CUIL
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    copyToClipboard(formatCuil(selectedRow.cuil));
                  }}
                >
                  <ClipboardMinusIcon className="size-4" />
                  Copiar CUIL (con guiones)
                </ContextMenuItem>
              </ContextMenuGroup>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
