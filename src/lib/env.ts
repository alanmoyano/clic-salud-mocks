import { Client } from '@notionhq/client'

export const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env as Record<
  string,
  string
>

export const notion = new Client({ auth: NOTION_API_KEY })
export const database_id = NOTION_DATABASE_ID
