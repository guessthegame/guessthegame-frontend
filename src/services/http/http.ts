import { HttpError } from './HttpError.class'

export function httpGet<T>(url: string, accessToken?: string): Promise<T> {
  return httpCall({ verb: 'GET', url, accessToken })
}
export function httpDelete<T>(url: string, accessToken?: string): Promise<T> {
  return httpCall({ verb: 'DELETE', url, accessToken })
}
export function httpPost<T>(url: string, body: unknown, accessToken?: string): Promise<T> {
  return httpCall({ verb: 'POST', url, accessToken, body })
}
export function httpPut<T>(url: string, body: unknown, accessToken?: string): Promise<T> {
  return httpCall({ verb: 'PUT', url, accessToken, body })
}
export function httpPatch<T>(url: string, body: unknown, accessToken?: string): Promise<T> {
  return httpCall({ verb: 'PATCH', url, accessToken, body })
}

type HttpCallProps = {
  url: string
  accessToken?: string
} & (
  | {
      verb: 'GET' | 'DELETE'
    }
  | {
      verb: 'POST' | 'PATCH' | 'PUT'
      body: unknown
    }
)
async function httpCall<T>(props: HttpCallProps): Promise<T> {
  const response = await fetch(props.url, {
    method: props.verb,
    body:
      props.verb === 'POST' || props.verb === 'PATCH' || props.verb === 'PUT'
        ? JSON.stringify(props.body)
        : undefined,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: props.accessToken ? `bearer ${props.accessToken}` : '',
    },
  })
  const body = await response.json()
  if (!response.ok) {
    throw new HttpError(response, body)
  }
  return body
}
