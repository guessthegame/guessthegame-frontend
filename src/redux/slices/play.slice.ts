import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const MAX_VIEWED_SCREENSHOT_LENGTH = 1000

interface PlayState {
  screenshotsViewed: number[]
}

const initialState: PlayState = {
  screenshotsViewed: getFromLocalStorage(),
}

export const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    /**
     * Add a screenshot ID to the list of latest viewed screenshots.
     */
    addToScreenshotsViewed: (state, { payload }: PayloadAction<{ id: number }>) => {
      // Create a new list with latest screenshot added
      const newList = getNewList(state.screenshotsViewed, payload.id)

      // Save in LocalStorage
      storeInLocalStorage(newList)

      // Update state
      return {
        ...state,
        screenshotsViewed: newList,
      }
    },

    /**
     * Remove a screenshot ID from the list of viewed screenshots.
     */
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

function getNewList(list: number[], newId: number): number[] {
  if (list.includes(newId)) {
    return [...list.filter((id) => id !== newId), newId]
  }
  if (list.length >= MAX_VIEWED_SCREENSHOT_LENGTH) {
    return [...list.slice(1, MAX_VIEWED_SCREENSHOT_LENGTH), newId]
  }
  return [...list, newId]
}

function getFromLocalStorage(): number[] {
  if (typeof localStorage === 'undefined') {
    return []
  }
  const lastViewedScreenshotsFromLocalStorage = localStorage.getItem('lastViewedScreenshotsIds')
  if (!lastViewedScreenshotsFromLocalStorage) {
    return []
  }
  return JSON.parse(lastViewedScreenshotsFromLocalStorage)
}

function storeInLocalStorage(lastViewedScreenshotsIds: number[]): void {
  if (typeof localStorage === 'undefined') {
    return
  }
  localStorage.setItem('lastViewedScreenshotsIds', JSON.stringify(lastViewedScreenshotsIds))
}
