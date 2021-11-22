import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="bg-white rounded-xl max-w-4xl mx-auto mt-10 p-10 text-center">
      <h1 className="font-norwester text-xl text-grey-dark mb-3">
        Welcome to Guess The Game, the ultimate video game quizz!
      </h1>
      <p>
        Guess video games based on one screenshot, and climb the leaderboard!
      </p>
      <img src="/images/1567291511286_fjifn3.jpg" className="w-full" />
      <p>
        Want to contribute? You can add your own screenshots, and see how many
        players will guess them!
      </p>
    </div>
  )
}

export default Home
