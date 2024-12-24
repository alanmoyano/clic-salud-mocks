'use client'

import { Environment, User } from '@/app/page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function parseEnvironment(environment: Environment) {
  const parsedEnvironment = environment.toLowerCase()

  return parsedEnvironment === 'test' ? 'tst' : parsedEnvironment
}
export function UsersTable({
  users,
  environment,
}: {
  users: User[]
  environment: Environment
}) {
  function handleLogin(cuil: number) {
    const baseUrl = `https://rugepresa${parseEnvironment(environment)}.cidsfrcutn.tech/api/rugepresa-api/login-alternativo-mock-cidi/${cuil}`
    window.open(baseUrl, '_blank')
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>CUIL</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Login</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.cuil}>
            <TableCell>{user.cuil}</TableCell>
            <TableCell>{user.nombre}</TableCell>
            <TableCell>
              <div className='flex flex-wrap gap-1'>
                {user.roles.map(role => (
                  <Badge key={role} variant='secondary'>
                    {role}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleLogin(user.cuil)}>Login</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
