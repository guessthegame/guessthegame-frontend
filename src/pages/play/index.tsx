import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../../redux/redux-hooks'
import { apiGetUnsolvedScreenshotId } from '../../services/api/routes/screenshot/api-get-unsolved-screenshot'

const Play: NextPage = () => {
  const router = useRouter()
  const screenshotsViewed = useAppSelector((state) => state.play.screenshotsViewed)

  useEffect(() => {
    ;(async () => {
      const response = await apiGetUnsolvedScreenshotId({ exclude: screenshotsViewed })
      if (response.id) {
        router.push(`/play/${response.id}`)
      } else {
        router.push(`/play/the-end`)
      }
    })()
  }, [router, screenshotsViewed])

  return <div />
}

export default Play
