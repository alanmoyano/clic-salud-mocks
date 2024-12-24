import { NextResponse } from 'next/server'

import { Client } from '@notionhq/client'

import { NOTION_API_KEY, NOTION_DATABASE_ID } from '@/lib/env'

const notion = new Client({ auth: NOTION_API_KEY })
const database_id = NOTION_DATABASE_ID

export async function POST(request: Request) {
  const { entorno } = await request.json()

  console.log(entorno)

  const response = await notion.databases.query({
    database_id,
    filter: {
      property: 'Entorno',
      select: {
        equals: entorno,
      },
    },
  })
  return NextResponse.json(response)
}
