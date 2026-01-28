import "@tanstack/react-table";
import type * as Table from "@tanstack/table-core";
import type { ClassValue } from "clsx";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends Table.RowData, TValue> {
    headerClassName?: ClassValue;
    cellClassName?: ClassValue;
    backendLocal?: boolean;
  }
}

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends Table.RowData> {
    backendLocal?: boolean;
  }
}
