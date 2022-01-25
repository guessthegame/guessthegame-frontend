import type { NextPage } from 'next'
import { PlayPage } from '../../components/pages/play/PlayPage'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const Play: NextPage = () => {
  const router = useRouter()

  const { id: stringId } = router.query
  const id = useMemo(() => {
    if (typeof stringId === 'string') {
      return parseInt(stringId, 10)
    }
  }, [stringId])

  return (
    <>
      <Head>
        <title>Shot #{stringId} - Guess The Game!</title>
      </Head>
      {id ? <PlayPage id={id} /> : null}
    </>
  )
}

export default Play
