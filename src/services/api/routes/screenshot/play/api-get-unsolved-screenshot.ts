import store from '../../../../../redux/store'
import { httpPost } from '../../../../http/http'
import { authenticatedPost, getApiUrl } from '../../../api'
import { components } from '../../types.generated'

type Request = components['schemas']['GetUnsolvedScreenshotControllerRequest']
type Response = components['schemas']['GetUnsolvedScreenshotControllerResponse']

export function apiGetUnsolvedScreenshotId(): Promise<Response> {
  const { auth, play } = store.getState()
  const exclude = play.screenshotsViewed
  const body: Request = { exclude }
  if (auth.isLoggedIn) {
    return authenticatedPost('/frontend/play/unsolved-screenshot-authenticated', body)
  }
  return httpPost(getApiUrl('/frontend/play/unsolved-screenshot-unauthenticated'), body)
}
