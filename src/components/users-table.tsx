'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import Loading from '@/app/[environment]/loading'
import { LoginButton } from '@/components/login-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { handleLogin } from '@/lib/login'
import { Environment, PosibleRol } from '@/lib/types'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { usePathname } from 'next/navigation'
import { Suspense, useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname()
  const environment = pathname.slice(1) as Environment

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  const roles: PosibleRol[] = [
    'Efector',
    'Auditor',
    'Arquitectura',
    'Coordinador',
    'Administrador',
  ]

  const anchos = ['w-[15em]', 'w-[15em]', 'w-[25em]', 'w-[25em]']

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <div className='flex items-center gap-4 py-4'>
          <Input
            placeholder='Filtrar por nombre'
            value={
              (table.getColumn('nombre')?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn('nombre')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <ToggleGroup type='single'>
            {roles.map(role => (
              <ToggleGroupItem
                key={role}
                id={role}
                value={role}
                variant='outline'
                onClick={event =>
                  table
                    .getColumn('roles')
                    ?.setFilterValue(
                      event.currentTarget.getAttribute('data-state') === 'off'
                        ? event.currentTarget.getAttribute('id')
                        : null
                    )
                }
              >
                {role}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='secondary'>
                Iniciar Sesión con un CUIL distinto
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-md'>
              <DialogHeader>
                <DialogTitle>Iniciar Sesión con un CUIL distinto</DialogTitle>
                <DialogDescription>
                  Ingresa el CUIL que quieres utilizar para iniciar sesión.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={event => {
                  event.preventDefault()
                  handleLogin(
                    environment,
                    Number(event.currentTarget.cuil.value)
                  )
                }}
              >
                <div className='grid grid-cols-4 items-center gap-4 py-4'>
                  <Label htmlFor='cuil' className='text-right'>
                    CUIL
                  </Label>
                  <Input
                    id='cuil'
                    placeholder='Ingresa aquí el CUIL'
                    className='col-span-3'
                  />
                </div>
                <DialogFooter>
                  <LoginButton environment={environment} />
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className='rounded-md border'>
          <Table className='w-full table-fixed'>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead key={header.id} className={anchos[index]}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Suspense>
  )
}
