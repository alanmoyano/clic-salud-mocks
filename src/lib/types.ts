import type {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

type Select = {
  id: string
  name: string
  color: string
}

type Rol = {
  name: 'Efector' | 'Auditor' | 'Arquitectura' | 'Coordinador' | 'Administrador'
} & Select

type Entorno = {
  name: 'DEV' | 'TEST' | 'DEMO'
} & Select

type ClicSaludUser = {
  properties: {
    Nombre: {
      type: 'title'
      title: RichTextItemResponse[]
      id: string
    }
    CUIL: {
      type: 'number'
      number: number
      id: string
    }
    Roles: {
      type: 'multi_select'
      multi_select: Rol[]
      id: string
    }
    Entorno: {
      type: 'select'
      select: Entorno | null
      id: string
    }
  }
} & PageObjectResponse

export function isClicSaludUser(
  user: PageObjectResponse
): user is ClicSaludUser {
  const nombreCheck = user.properties.Nombre?.type === 'title'
  const cuilCheck = user.properties.CUIL?.type === 'number'
  const rolesCheck = user.properties.Roles?.type === 'multi_select'
  const entornoCheck = user.properties.Entorno?.type === 'select'

  return nombreCheck && cuilCheck && rolesCheck && entornoCheck
}
