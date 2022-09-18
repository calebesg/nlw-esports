import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react'

import { CreateAdBanner } from './components/CreateAdBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { GameBanner } from './components/GameBanner'

import logoImg from './assets/logo.svg'

import './styles/main.css'
import 'keen-slider/keen-slider.min.css'

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
  const [currentSlider, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDialogElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      '(min-width: 400px)': {
        slides: { perView: 2, spacing: 16 },
      },
      '(min-width: 600px)': {
        slides: { perView: 3, spacing: 16 },
      },
      '(min-width: 800px)': {
        slides: { perView: 4, spacing: 16 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 5, spacing: 16 },
      },
      '(min-width: 1200px)': {
        slides: { perView: 6, spacing: 16 },
      },
    },
    slides: { perView: 1, spacing: 16 },
  })

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  return (
    <div className="max-w-[1344px] flex flex-col items-center mt-20 md:my-20 mx-auto md:px-20">
      <img src={logoImg} alt="NLW esports" className="w-[240px] md:w-auto" />

      <h1 className="font-black text-5xl text-center px-6 md:text-6xl text-white mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      {games.length > 0 && (
        <div className="w-full px-4 md:px-0 navigation-wrapper relative">
          <div ref={sliderRef as any} className="keen-slider mt-20">
            {games.map(game => (
              <GameBanner
                key={game.id}
                adsCount={game._count.ads}
                bannerUrl={game.imageUrl}
                title={game.name}
              />
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <button
                className="arrow arrow--left absolute top-1/2 left-6 bg-black/80 md:-left-14 w-12 h-12 rounded-full translate-y-1/2"
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              >
                <CaretLeft size={42} color="#fff" width="bold" />
              </button>
              <button
                className="arrow arrow--right absolute top-1/2 right-6 bg-black/80 md:-right-14 w-12 h-12 rounded-full translate-y-1/2"
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
              >
                <CaretRight size={42} color="#fff" width="bold" />
              </button>
            </>
          )}
        </div>
      )}

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
