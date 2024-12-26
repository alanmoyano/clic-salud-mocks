'use cache'

import { isFullPage } from '@notionhq/client'

import { columns } from '@/components/columns'
import { DataTable } from '@/components/users-table'
import { database_id, notion } from '@/lib/env'
import type { Environment, User } from '@/lib/types'
import { isClicSaludUser } from '@/lib/types'

async function getUsers(environment: Environment) {
  const { results } = await notion.databases.query({
    database_id,
    filter: {
      property: 'Entorno',
      select: {
        equals: environment.toLowerCase(),
      },
    },
  })

  const users: User[] = []

  for (const result of results) {
    if (!isFullPage(result)) continue
    if (!isClicSaludUser(result)) continue

    users.push({
      cuil: result.properties.CUIL.number,
      nombre: result.properties.Nombre.title[0].plain_text,
      roles: result.properties.Roles.multi_select.map(role => role.name),
      entorno: result.properties.Entorno.select.name,
    })
  }

  return users
}

export default async function Environment({
  params,
}: {
  params: Promise<{ environment: string }>
}) {
  const { environment } = await params

  const users = await getUsers(environment as Environment)

  return (
    <section className='m-auto grid max-w-screen-xl'>
      <DataTable columns={columns} data={users} />
    </section>
  )
}
