import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuItem,
} from "@/components/ui/context-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { isUser, type User } from "@/types/users";
import { flexRender } from "@tanstack/react-table";
import { cn, formatCuil } from "@/lib/utils";
import { useContext, useState } from "react";
import { TableContext } from "@/components/providers/user-table-provider";
import {
  ClipboardIcon,
  ClipboardMinusIcon,
  Columns3CogIcon,
  GlobeIcon,
  MonitorDownIcon,
  PinIcon,
} from "lucide-react";
import { getLoginUrl } from "@/api/login";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export function DataTable() {
  const { table } = useContext(TableContext)!;

  const [selectedRow, setSelectedRow] = useState<User>();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <ContextMenu>
          <ContextMenuTrigger
            render={
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
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
            }
          />
          <ContextMenuContent align="end">
            <ContextMenuGroup>
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <Columns3CogIcon />
                  Columnas a Mostrar
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuGroup>
                    <ContextMenuCheckboxItem
                      checked={table
                        .getAllColumns()
                        .every((column) => column.getIsVisible())}
                      onCheckedChange={() =>
                        table
                          .getAllColumns()
                          .forEach((column) => column.toggleVisibility(true))
                      }
                      closeOnClick={false}
                    >
                      Todas
                    </ContextMenuCheckboxItem>
                    <ContextMenuSeparator />
                    {table.getAllColumns().map((column) => {
                      if (column.getCanHide()) {
                        return (
                          <ContextMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => {
                              column.toggleVisibility(value);
                            }}
                          >
                            {column.id}
                          </ContextMenuCheckboxItem>
                        );
                      } else {
                        return (
                          <ContextMenuItem
                            key={column.id}
                            className="capitalize"
                            disabled
                            closeOnClick={false}
                          >
                            {column.id}
                            <span className="pointer-events-none absolute right-2">
                              <PinIcon />
                            </span>
                          </ContextMenuItem>
                        );
                      }
                    })}
                  </ContextMenuGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
        <ContextMenu onOpenChange={setMenuOpen}>
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
                          backendLocal: table.options.meta?.backendLocal,
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
                          backendLocal: table.options.meta?.backendLocal,
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
      </Table>
    </div>
  );
}
