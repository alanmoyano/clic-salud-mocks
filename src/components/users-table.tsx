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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { handleLogin } from '@/lib/login'
import { Environment, PossibleRol } from '@/lib/types'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { usePathname } from 'next/navigation'
import { Suspense, useRef, useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const environment = usePathname().slice(1) as Environment

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const cuil = useRef(0)

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

  const roles: PossibleRol[] = [
    'Efector',
    'Auditor',
    'Arquitectura',
    'Coordinador',
    'Administrador',
  ]

  const widths = ['w-[10%]', 'w-[15%]', 'w-[20%]', 'w-[35%]']

  return (
    <Suspense fallback={<Loading />}>
      <div className='p-2'>
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
            <DialogContent className='max-w-xl'>
              <DialogHeader>
                <DialogTitle>Iniciar Sesión con un CUIL distinto</DialogTitle>
                <DialogDescription>
                  Ingresa el CUIL que quieres utilizar para iniciar sesión.
                </DialogDescription>
              </DialogHeader>
              <div className='py-4'>
                <InputOTP
                  maxLength={11}
                  id='cuil'
                  pattern={REGEXP_ONLY_DIGITS}
                  onChange={event => (cuil.current = Number(event))}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                    <InputOTPSlot index={8} />
                    <InputOTPSlot index={9} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={10} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <DialogFooter>
                <LoginButton
                  environment={environment}
                  onClick={() => handleLogin(environment, false, cuil.current)}
                />
                <LoginButton
                  local
                  environment={environment}
                  onClick={() => handleLogin(environment, true, cuil.current)}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className='rounded-md border'>
          <Table className='table-fixed'>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead key={header.id} className={widths[index]}>
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
