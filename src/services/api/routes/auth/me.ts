import { authenticatedGet, getApiUrl } from '../../api'
import { components } from '../types.generated'

type Response = components['schemas']['MeAuthControllerResponse']

export function apiMe(): Promise<Response> {
  return authenticatedGet(getApiUrl('/auth/me'))
}
