'use cache'

import { columns } from '@/components/columns'
import { DataTable } from '@/components/users-table'
import type { Environment } from '@/lib/types'
import { getUsers } from '@/lib/users'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ environment: string }>
}): Promise<Metadata> {
  const { environment } = await params

  return {
    title: `Mocks para ${environment}`,
    description: `Lista de usuarios de ${environment}`,
    openGraph: {
      title: `Mocks para ${environment}`,
      description: `Lista de usuarios de ${environment}`,
    },
  }
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
