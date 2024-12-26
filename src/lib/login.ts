import { Environment } from '@/lib/types'

export function handleLogin(environment: Environment, cuil: number) {
  const baseUrl =
    environment === 'dev'
      ? 'http://172.16.18.237:8083'
      : `https://rugepresa${environment === 'test' ? 'tst' : environment}.cidsfrcutn.tech`
  const apiUrl = `${environment !== 'dev' ? 'api/' : ''}rugepresa-api/login-alternativo-mock-cidi`
  window.open(`${baseUrl}/${apiUrl}/${cuil}`, '_blank')
}
