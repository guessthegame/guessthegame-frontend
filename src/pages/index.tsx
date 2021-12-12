import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-white rounded-xl max-w-4xl mx-auto mt-10 p-10 text-center">
        <h1 className="font-norwester text-xl text-grey-dark mb-3">
          Can you guess the game from a single frame?
        </h1>
        <p>Guess the video game just by looking at a screenshot and climb the leaderboard.</p>
        <p>You can add your own screenshots, and see how many other players will guess them!</p>

        {/* <ScreenshotImage className="max-w-full" /> */}
      </div>
    </>
  )
}

export default Home
