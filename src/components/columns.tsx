'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Environment } from '@/lib/types'
import { rankItem } from '@tanstack/match-sorter-utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpRight } from 'lucide-react'

export type User = {
  cuil: number
  nombre: string
  roles: string[]
  entorno: Environment
}

function parseEnvironment(environment: Environment) {
  const parsedEnvironment = environment.toLowerCase()

  return parsedEnvironment === 'test' ? 'tst' : parsedEnvironment
}

function handleLogin(environment: Environment, cuil: number) {
  const baseUrl = `https://rugepresa${parseEnvironment(environment)}.cidsfrcutn.tech${environment === 'dev' && '/api'}/rugepresa-api/login-alternativo-mock-cidi/${cuil}`
  window.open(baseUrl, '_blank')
}

export const columns: ColumnDef<User, User>[] = [
  {
    accessorKey: 'cuil',
    header: 'CUIL',
  },
  {
    id: 'nombre',
    accessorKey: 'nombre',
    header: 'Nombre',
    filterFn: (row, columnId, value, addMeta) => {
      // Rank the item
      const itemRank = rankItem(row.getValue(columnId), value)

      // Store the itemRank info
      addMeta({ itemRank })

      // Return if the item should be filtered in/out
      return itemRank.passed
    },
  },
  {
    id: 'roles',
    accessorKey: 'roles',
    header: 'Roles',
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-1'>
        {row.original.roles.map(role => (
          <Badge key={role} variant='secondary'>
            {role}
          </Badge>
        ))}
      </div>
    ),
    filterFn: 'arrIncludes',
  },
  {
    id: 'login',
    cell: ({ row }) => (
      <Button
        onClick={() => handleLogin(row.original.entorno, row.original.cuil)}
      >
        <span className='flex items-center gap-1'>
          <ArrowUpRight /> Iniciar Sesión en{' '}
          <strong>{row.original.entorno}</strong>
        </span>
      </Button>
    ),
  },
]
