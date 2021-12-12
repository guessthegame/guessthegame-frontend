type ErrorBodyType = ({ message?: string | string[] } & Record<string, unknown>) | null
export class HttpError extends Error {
  status: number
  statusText: string
  body: ErrorBodyType

  constructor(response: Pick<Response, 'status' | 'statusText'>, body: ErrorBodyType = null) {
    super(response.statusText)
    this.status = response.status
    this.statusText = response.statusText
    this.body = body
  }
}
