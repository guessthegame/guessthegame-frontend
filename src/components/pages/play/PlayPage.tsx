import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { displayDate } from '../../../helpers/time'
import { useAppDispatch } from '../../../redux/redux-hooks'
import { playActions } from '../../../redux/slices/play.slice'
import { apiPlayGetScreenshot } from '../../../services/api/routes/screenshot/play/api-get-screenshot'
import { apiGetUnsolvedScreenshotId } from '../../../services/api/routes/screenshot/play/api-get-unsolved-screenshot'
import { components } from '../../../services/api/routes/types.generated'
import { ScreenshotImage } from '../../shared/ScreenshotImage'
import { DropContainer } from './components/DropContainer'

interface PlayPageProps {
  id: number
}
export const PlayPage = ({ id }: PlayPageProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  /**
   * Load Screenshot
   */
  const [isLoading, setIsLoading] = useState(true)
  const [screenshot, setScreenshot] =
    useState<components['schemas']['GetScreenshotControllerResponse']>()
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      dispatch(playActions.addToScreenshotsViewed({ id }))
      const screenshot = await apiPlayGetScreenshot(id)
      setScreenshot(screenshot)
      setIsLoading(false)
    })()
  }, [dispatch, id])

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
          #{id}
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
          <div className="hidden lg:inline-block">
            <DropContainer>
              <p className="text-grey-dark">Added by {screenshot?.addedBy.username}</p>
              <p className="text-grey">{displayDate(screenshot?.creationDate)}</p>
            </DropContainer>
          </div>
        </div>

        <div className="flex-1">
          <DropContainer>
            <div className="flex w-full justify-center items-center">
              <button
                type="button"
                onClick={handleOnPrevious}
                className="border border-black w-6 h-6 rounded-full flex items-center"
                title="Previous screenshot"
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
                title="Random unsolved screenshot"
              >
                <div
                  className="border-r border-t border-black w-2 h-2 rotate-45 relative"
                  style={{ left: 5 }}
                ></div>
              </button>
            </div>
          </DropContainer>
        </div>

        <div className="hidden md:block flex-1 text-right ">
          <div className="hidden lg:inline-block">
            <DropContainer>
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
            </DropContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
