import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { apiGetUnsolvedScreenshotId } from '../../services/api/routes/screenshot/play/api-get-unsolved-screenshot'

const Play: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const response = await apiGetUnsolvedScreenshotId()
      if (response.id) {
        router.push(`/play/${response.id}`)
      } else {
        router.push(`/play/the-end`)
      }
    })()
  }, [router])

  return <div />
}

export default Play
