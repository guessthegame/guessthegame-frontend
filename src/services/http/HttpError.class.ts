export class HttpError extends Error {
  status: number
  statusText: string
  body: null | unknown

  constructor(response: Pick<Response, 'status' | 'statusText'>, body: unknown = null) {
    super(response.statusText)
    this.status = response.status
    this.statusText = response.statusText
    this.body = body
  }
}
