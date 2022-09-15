import { CreateAdBanner } from './components/CreateAdBanner'
import { GameBanner } from './components/GameBanner'

import logoImg from './assets/logo.svg'
import './styles/main.css'

function App() {
  return (
    <div className="max-w-[1344px] flex flex-col items-center my-20 mx-auto">
      <img src={logoImg} alt="NLW esports" />

      <h1 className="font-black text-6xl text-white mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameBanner
          adsCount={3}
          bannerUrl="/game-1.png"
          title="League of Legends"
        />
      </div>

      <CreateAdBanner />
    </div>
  )
}

export default App
