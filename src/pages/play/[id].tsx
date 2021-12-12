import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/redux-hooks'
import { playActions } from '../../redux/slices/play.slice'
import { apiPlayGetScreenshot } from '../../services/api/routes/screenshot/play/api-get-screenshot'
import { components } from '../../services/api/routes/types.generated'
import { displayDate } from '../../helpers/time'
import { ScreenshotImage } from '../../components/shared/ScreenshotImage'
import { apiGetUnsolvedScreenshotId } from '../../services/api/routes/screenshot/play/api-get-unsolved-screenshot'

const Play: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  /**
   * Load Screenshot
   */
  const { id: stringId } = router.query
  const [isLoading, setIsLoading] = useState(true)
  const [screenshot, setScreenshot] =
    useState<components['schemas']['GetScreenshotControllerResponse']>()
  useEffect(() => {
    ;(async () => {
      if (typeof stringId !== 'string') {
        return
      }
      setIsLoading(true)
      const id = parseInt(stringId, 10)
      dispatch(playActions.addToScreenshotsViewed({ id }))
      const screenshot = await apiPlayGetScreenshot(id)
      setScreenshot(screenshot)
      setIsLoading(false)
    })()
  }, [dispatch, stringId])

  /**
   * Handle Previous
   */
  const handleOnPrevious = () => {
    router.back()
  }

  /**
   * Handle Next
   */
  const handleOnNext = useCallback(async () => {
    setIsLoading(true)
    const response = await apiGetUnsolvedScreenshotId()
    if (response.id) {
      router.push(`/play/${response.id}`)
    } else {
      router.push(`/play/the-end`)
    }
  }, [router])

  return (
    <div>
      <div className="flex justify-center">
        <p className="text-2xl font-norwester inline-block bg-white py-3 px-5 rounded-3xl z-30 relative top-7">
          #{stringId}
        </p>
      </div>
      {screenshot ? (
        <ScreenshotImage
          screenshot={screenshot.image}
          className={`sm:rounded-xl md:rounded-3xl z-20 relative w-full transition ${
            isLoading ? 'opacity-50' : ''
          }`}
        />
      ) : null}
      <div className="flex align-top">
        <div className="hidden md:block flex-1">
          <div className="hidden lg:inline-block bg-white px-5 rounded-b-3xl pt-6 pb-3 relative bottom-3">
            <p className="text-grey-dark">Added by {screenshot?.addedBy.username}</p>
            <p className="text-grey">{displayDate(screenshot?.creationDate)}</p>
          </div>
        </div>

        <div className="flex-1 flex w-full justify-center relative px-5 pt-6 pb-3 bottom-3 bg-white rounded-b-3xl items-center">
          <button
            type="button"
            onClick={handleOnPrevious}
            className="border border-black w-6 h-6 rounded-full flex items-center"
          >
            <div
              className="border-l border-b border-black w-2 h-2 rotate-45 relative"
              style={{ left: 9 }}
            ></div>
          </button>

          <input
            disabled={isLoading}
            placeholder="Which game is this?"
            className="border border-grey-dark p-2 rounded text-grey mx-10 flex-1 min-w-0"
          />

          <button
            onClick={handleOnNext}
            disabled={isLoading}
            className="border border-black w-6 h-6 rounded-full flex items-center"
          >
            <div
              className="border-r border-t border-black w-2 h-2 rotate-45 relative"
              style={{ left: 5 }}
            ></div>
          </button>
        </div>

        <div className="hidden md:block flex-1 text-right ">
          <div className="hidden lg:inline-block  bg-white px-5 rounded-b-3xl pt-6 pb-3 relative bottom-3">
            {screenshot?.firstSolvedBy ? (
              <>
                <p className="text-grey-dark">
                  First solved by {screenshot.firstSolvedBy.username}
                </p>
                <p className="text-grey">Solved by {screenshot.totalSolves} people</p>
              </>
            ) : (
              <p className="text-grey align-right">Nobody solved this one yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Play
