import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "@/types/users";
import type { Column } from "@tanstack/react-table";
import {
  ArrowDownWideNarrowIcon,
  ArrowUpDownIcon,
  ArrowUpWideNarrowIcon,
} from "lucide-react";

export function DataTableColumnHeader({
  column,
  title,
  className,
}: {
  column: Column<User>;
  title?: string;
  className?: string;
}) {
  const sorted = column.getIsSorted();

  return column.getCanSort() ? (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        if (!sorted) {
          column.toggleSorting(false);
        } else if (sorted === "asc") {
          column.toggleSorting(true);
        } else {
          column.clearSorting();
        }
      }}
      className={cn("capitalize", className)}
    >
      {title ?? column.id}
      {sorted === "desc" ? (
        <ArrowDownWideNarrowIcon />
      ) : sorted === "asc" ? (
        <ArrowUpWideNarrowIcon />
      ) : (
        <ArrowUpDownIcon />
      )}
    </Button>
  ) : (
    <Button variant="ghost" size="sm" className={cn("capitalize", className)}>
      {title ?? column.id}
    </Button>
  );
}
