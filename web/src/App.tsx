import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { GameBanner } from './components/GameBanner'

import logoImg from './assets/logo.svg'

import './styles/main.css'

interface Game {
  id: string
  name: string
  imageUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

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
        {games.map(game => (
          <GameBanner
            key={game.id}
            adsCount={game._count.ads}
            bannerUrl={game.imageUrl}
            title={game.name}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
