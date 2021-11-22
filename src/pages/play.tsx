import type { NextPage } from 'next'

const Play: NextPage = () => {
  return (
    <div>
      <div className="flex justify-center">
        <p className="text-2xl font-norwester inline-block bg-white py-3 px-5 rounded-3xl z-30 relative top-7">
          #42
        </p>
      </div>
      <img
        src="/images/1567291511286_fjifn3.jpg"
        className="w-full rounded-3xl z-20 relative"
      />
      <div className="flex justify-between">
        <div className="inline-block bg-white px-5 rounded-b-3xl relative bottom-2 pt-5 pb-3">
          <p className="text-grey-dark">Added by Paulin</p>
          <p className="text-grey">15-05-2018</p>
        </div>

        <div className="inline-block bg-white px-5 rounded-b-3xl relative bottom-2 pt-5 pb-3">
          <input
            placeholder="Which game is this?"
            className="border border-solid border-grey rounded-md p-1 mt-1"
          />
        </div>

        <div className="inline-block bg-white px-5 rounded-b-3xl relative bottom-2 pt-5 pb-3">
          <p className="text-grey-dark">Solved by 62 people</p>
          <p className="text-grey">First solved by Margot Brun</p>
        </div>
      </div>
    </div>
  )
}

export default Play
