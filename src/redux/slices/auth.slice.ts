import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'

interface AuthState {
  accessToken: string | null
  accessTokenExpiryTimestamp: number
  isLoggedIn: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  accessToken: null,
  accessTokenExpiryTimestamp: 0,
  isLoggedIn: false,
  isLoading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      const decodedToken = jwt_decode<{ exp: number }>(action.payload.accessToken)
      window.localStorage.setItem('refreshToken', action.payload.refreshToken)

      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
        accessTokenExpiryTimestamp: new Date((decodedToken.exp - 1 * 60) * 1000).getTime(),
        isLoading: false,
      }
    },
    logOut: (state) => {
      window.localStorage.removeItem('refreshToken')
      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
        accessTokenExpiryTimestamp: 0,
        isLoading: false,
      }
    },
    stopLoading: (state) => {
      return {
        ...state,
        isLoading: false,
      }
    },
  },
})

export const { logIn, logOut, stopLoading } = authSlice.actions

export default authSlice.reducer
