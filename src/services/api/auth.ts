import { logIn, logOut } from '../../redux/slices/auth.slice'
import store from '../../redux/store'
import { HttpError } from '../http/HttpError.class'
import { apiRefreshTokens } from './routes/auth/refresh-token'

/**
 * Get a valid Access Token or throws
 */
export async function getActiveAccessToken(): Promise<string> {
  const { accessToken, accessTokenExpiryTimestamp } = store.getState().auth

  // If access token is still valid, return it
  if (accessToken && new Date().getTime() < accessTokenExpiryTimestamp) {
    return accessToken
  }

  // Access Token not valid: we refresh the tokens
  return refreshTokens()
}

/**
 * Refresh both access and refresh tokens, returns Access Token
 * Throws Error if cannot refresh tokens
 */
export async function refreshTokens(): Promise<string> {
  // Retrieve access token from local storage
  const refreshToken = window.localStorage.getItem('refreshToken')

  // No refreshToken: the user should be be here without refresh tokens: log out
  if (!refreshToken) {
    store.dispatch(logOut())
    throw new Error('Could not refresh tokens')
  }

  try {
    // Get a new pair of tokens
    const response = await apiRefreshTokens({ refreshToken })
    // Save new tokens in store
    store.dispatch(logIn(response))
    // Return access token
    return response.accessToken
  } catch (err) {
    // If the server returned a 401 UNAUTHORIZED request when refreshing the token, the user should be logged out
    if (err instanceof HttpError && err.status === 401) {
      store.dispatch(logOut())
    }
  }

  throw new Error('Could not refresh tokens')
}
