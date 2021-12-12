import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/auth.slice'
import playReducer from './slices/play.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    play: playReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
