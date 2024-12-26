'use client'

import { LoginButton } from '@/components/login-button'
import { Badge } from '@/components/ui/badge'
import { handleLogin } from '@/lib/login'
import { Environment } from '@/lib/types'
import { rankItem } from '@tanstack/match-sorter-utils'
import { ColumnDef } from '@tanstack/react-table'

export type User = {
  cuil: number
  nombre: string
  roles: string[]
  entorno: Environment
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
      <LoginButton
        environment={row.original.entorno}
        onClick={() => handleLogin(row.original.entorno, row.original.cuil)}
      />
    ),
  },
]
