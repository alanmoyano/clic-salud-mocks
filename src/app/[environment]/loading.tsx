'use cache'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function Loading() {
  const arrayOf4 = [...Array(4)]
  const arrayOf8 = [...Array(8)]

  return (
    <div className='m-auto grid max-w-screen-xl py-4'>
      <div className='flex items-center gap-4'>
        <Skeleton className='h-10 w-full' />
      </div>

      <div className='mt-4'>
        <Table className='table-fixed'>
          <TableHeader>
            <TableRow>
              {arrayOf4.map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className='h-8 w-full' />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrayOf8.map((_, index) => (
              <TableRow key={index}>
                {arrayOf4.map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className='h-12 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
