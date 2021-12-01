import { logOut } from '../../redux/slices/auth.slice'
import store from '../../redux/store'
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from '../http/http'
import { HttpError } from '../http/HttpError.class'
import { getActiveAccessToken } from './auth'

export async function authenticatedGet<T>(url: string): Promise<T> {
  return authenticatedCall((accessToken) => httpGet<T>(getApiUrl(url), accessToken))
}

export async function authenticatedPatch<T>(url: string, body: unknown): Promise<T> {
  return authenticatedCall((accessToken) => httpPatch<T>(getApiUrl(url), body, accessToken))
}

export async function authenticatedPost<T>(url: string, body: unknown): Promise<T> {
  return authenticatedCall((accessToken) => httpPost<T>(getApiUrl(url), body, accessToken))
}

export async function authenticatedPut<T>(url: string, body: unknown): Promise<T> {
  return authenticatedCall((accessToken) => httpPut<T>(getApiUrl(url), body, accessToken))
}

export async function authenticatedDelete<T>(url: string): Promise<T> {
  return authenticatedCall((accessToken) => httpDelete<T>(getApiUrl(url), accessToken))
}

export function getApiUrl(path: string): string {
  if (!process.env.NEXT_PUBLIC_GTG_URL) {
    throw new Error('Missing NEXT_PUBLIC_GTG_URL param in .env')
  }
  return `${process.env.NEXT_PUBLIC_GTG_URL}${path}`
}

async function authenticatedCall<T>(callback: (token: string) => Promise<T>): Promise<T> {
  const token = await getActiveAccessToken()

  try {
    return await callback(token)
  } catch (err) {
    if (err instanceof HttpError && err.status === 401) {
      store.dispatch(logOut())
    }
    throw err
  }
}
