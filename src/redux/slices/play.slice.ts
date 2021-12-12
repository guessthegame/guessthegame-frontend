import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PlayState {
  screenshotsViewed: number[]
}

const initialState: PlayState = {
  screenshotsViewed: [],
}

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    addToScreenshotsViewed: (state, { payload }: PayloadAction<{ id: number }>) => {
      if (state.screenshotsViewed.includes(payload.id)) {
        return {
          ...state,
          screenshotsViewed: [payload.id],
        }
      }
      return {
        ...state,
        screenshotsViewed: [payload.id, ...state.screenshotsViewed],
      }
    },
    removeFromScreenshotViewed: (state, { payload }: PayloadAction<{ id: number }>) => {
      return {
        ...state,
        screenshotsViewed: state.screenshotsViewed.filter((id) => id !== payload.id),
      }
    },
  },
})

export const playActions = playSlice.actions

export default playSlice.reducer
