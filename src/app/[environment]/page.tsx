import { Client, isFullPage } from '@notionhq/client'

import type { Environment, User } from '@/app/page'
import { NOTION_API_KEY, NOTION_DATABASE_ID } from '@/lib/env'
import { isClicSaludUser } from '@/lib/types'
import { UsersTable } from '@/components/users-table'
import Link from 'next/link'

const environemnts = ['demo', 'test', 'dev']

export default async function Environment({
  params,
}: {
  params: { environment: Environment }
}) {
  'use cache'

  const { environment } = await params
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

  return (
    <section>
      <div>
        Hola desde <span className='font-bold'>{environment}</span>
        <div className='flex gap-2'>
          {environemnts.map(environment => (
            <Link key={environment} href={`/${environment}`}>
              {environment}
            </Link>
          ))}
        </div>
      </div>
      <code>{JSON.stringify(users)}</code>
      <UsersTable users={users} environment={environment} />
    </section>
  )
}
