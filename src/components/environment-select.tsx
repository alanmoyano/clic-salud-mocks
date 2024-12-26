import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Environment } from '@/lib/types'

export function EnvironmentSelect({
  setEnvironment,
}: {
  setEnvironment: (environment: Environment) => void
}) {
  return (
    <Select onValueChange={(value: Environment) => setEnvironment(value)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Seleccionar entorno' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='Demo'>Demo</SelectItem>
        <SelectItem value='Test'>Test</SelectItem>
        <SelectItem value='Dev'>Dev</SelectItem>
      </SelectContent>
    </Select>
  )
}
