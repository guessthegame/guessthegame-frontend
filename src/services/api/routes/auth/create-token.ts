import { httpPost } from '../../../http/http'
import { getApiUrl } from '../../api'
import { components } from '../types.generated'

type Request = components['schemas']['CreateTokenAuthControllerRequest']
type Response = components['schemas']['CreateTokenAuthControllerResponse']

export function apiCreateTokens(requestBody: Request): Promise<Response> {
  return httpPost(getApiUrl('/auth/tokens'), requestBody)
}
