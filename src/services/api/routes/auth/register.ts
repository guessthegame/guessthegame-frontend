import { httpPost } from '../../../http/http'
import { getApiUrl } from '../../api'
import { components } from '../types.generated'

type Request = components['schemas']['RegisterAuthControllerRequest']
type Response = components['schemas']['RegisterAuthControllerResponse']

export function apiRegister(requestBody: Request): Promise<Response> {
  return httpPost(getApiUrl('/auth/register'), requestBody)
}
