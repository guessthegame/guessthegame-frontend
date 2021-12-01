import { httpPut } from '../../../http/http'
import { getApiUrl } from '../../api'
import { components } from '../types.generated'

type Request = components['schemas']['RefreshTokenAuthControllerRequest']
type Response = components['schemas']['RefreshTokenAuthControllerResponse']

export async function apiRefreshTokens(requestBody: Request): Promise<Response> {
  return httpPut(getApiUrl('/auth/tokens'), requestBody)
}
