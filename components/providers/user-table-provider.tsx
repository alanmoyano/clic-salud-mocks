"use client";

import type { User } from "@/types/users";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
  type RowSelectionState,
  type SortingState,
  type Table as TanstackTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { parseAsBoolean, useQueryState } from "nuqs";
import { createContext, useState } from "react";

interface TableContextValue {
  table: TanstackTable<User>;
}

export const TableContext = createContext<TableContextValue | null>(null);

const fuzzyFilter: FilterFn<User> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function UserTableProvider({
  data,
  columns,
  children,
}: {
  data: User[];
  columns: ColumnDef<User>[];
  children: React.ReactNode;
}) {
  "use no memo";

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    selección: false,
    nombre: true,
    cuil: true,
    roles: true,
    entorno: true,
    equipo: false,
    acciones: true,
  });
  const [filtro, setFiltro] = useQueryState("filtro", {
    defaultValue: "",
  });
  const [backendLocal, setBackendLocal] = useQueryState(
    "backendLocal",
    parseAsBoolean.withDefault(false),
  );

  const table = useReactTable({
    data,
    columns,
    globalFilterFn: fuzzyFilter,
    state: {
      globalFilter: filtro.replaceAll("-", "").trim(),
      sorting,
      rowSelection,
      columnVisibility,
    },
    meta: {
      backendLocal,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltro,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <TableContext.Provider value={{ table }}>{children}</TableContext.Provider>
  );
}
