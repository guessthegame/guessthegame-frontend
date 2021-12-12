import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/redux-hooks'
import { playActions } from '../../redux/slices/play.slice'

const Play: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof id === 'string') {
      dispatch(playActions.addToScreenshotsViewed({ id: parseInt(id, 10) }))
    }
  }, [dispatch, id])

  return (
    <div>
      <div className="flex justify-center">
        <p className="text-2xl font-norwester inline-block bg-white py-3 px-5 rounded-3xl z-30 relative top-7">
          #42
        </p>
      </div>
      <img src="/images/1567291511286_fjifn3.jpg" className="w-full rounded-3xl z-20 relative" />
      <div className="flex justify-between">
        <div className="inline-block bg-white px-5 rounded-b-3xl relative bottom-2 pt-5 pb-3">
          <p className="text-grey-dark">Added by Paulin</p>
          <p className="text-grey">15/05/2018</p>
        </div>

        <div className="inline-block bg-white px-5 rounded-b-3xl relative bottom-2 pt-5 pb-3">
          <input
            placeholder="Which game is this?"
            className="border border-gray-300 p-2 rounded mt-1"
          />
        </div>

        <div className="inline-block bg-white px-5 rounded-b-3xl relative bottom-2 pt-5 pb-3 text-right">
          <p className="text-grey-dark">First solved by Margot Brun</p>
          <p className="text-grey">Solved by 62 people</p>
        </div>
      </div>
    </div>
  )
}

export default Play
