import store from '../../../../../redux/store'
import { httpGet } from '../../../../http/http'
import { authenticatedGet, getApiUrl } from '../../../api'
import { components } from '../../types.generated'

type Response = components['schemas']['GetScreenshotControllerResponse']

export function apiPlayGetScreenshot(id: number): Promise<Response> {
  if (store.getState().auth.isLoggedIn) {
    return authenticatedGet(`/frontend/play/get-screenshot/${id}/authenticated`)
  }
  return httpGet(getApiUrl(`/frontend/play/get-screenshot/${id}/unauthenticated`))
}
