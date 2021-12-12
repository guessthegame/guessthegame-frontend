import { authenticatedPost } from '../../api'
import { components } from '../types.generated'

type Request = components['schemas']['UploadScreenshotControllerRequest']
type Response = components['schemas']['UploadScreenshotControllerResponse']

export function apiCreateScreenshot(requestBody: Request): Promise<Response> {
  return authenticatedPost('/frontend/screenshots', requestBody)
}

export function apiUploadImage(image: File): Promise<{ uuid: string }> {
  const data = new FormData()
  data.append('file', image)
  return authenticatedPost('/frontend/screenshots/image', data)
}
