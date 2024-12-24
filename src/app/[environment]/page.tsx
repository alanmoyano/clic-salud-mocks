import { Client, isFullPage } from '@notionhq/client'

import type { Environment, User } from '@/app/page'
import { UsersTable } from '@/components/users-table'
import { NOTION_API_KEY, NOTION_DATABASE_ID } from '@/lib/env'
import { isClicSaludUser } from '@/lib/types'

async function getUsers(environment: Environment) {
  const notion = new Client({ auth: NOTION_API_KEY })
  const database_id = NOTION_DATABASE_ID

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
    <section>
      <UsersTable users={users} environment={environment as Environment} />
    </section>
  )
}
