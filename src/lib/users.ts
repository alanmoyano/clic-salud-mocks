import { notion, database_id } from '@/lib/env'
import { Environment, isClicSaludUser, User } from '@/lib/types'
import { isFullPage } from '@notionhq/client'

export async function getUsers(environment: Environment) {
  const { results } = await notion.databases.query({
    database_id,
    filter: {
      property: 'Entorno',
      select: {
        equals: environment.toLowerCase(),
      },
    },
    sorts: [
      {
        property: 'Nombre',
        direction: 'ascending',
      },
    ],
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
