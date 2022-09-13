import { MagnifyingGlassPlus } from 'phosphor-react'

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
        <a
          href=""
          className="relative rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
        >
          <img src="/game-1.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
            <strong className="text-white font-bold block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a
          href=""
          className="relative rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
        >
          <img src="/game-2.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
            <strong className="text-white font-bold block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a
          href=""
          className="relative rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
        >
          <img src="/game-3.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
            <strong className="text-white font-bold block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a
          href=""
          className="relative rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
        >
          <img src="/game-4.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
            <strong className="text-white font-bold block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a
          href=""
          className="relative rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
        >
          <img src="/game-5.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
            <strong className="text-white font-bold block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
        <a
          href=""
          className="relative rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
        >
          <img src="/game-6.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
            <strong className="text-white font-bold block">
              League of Legends
            </strong>
            <span className="text-zinc-300 text-sm">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="pt-1 bg-nlw-gradient mt-8 self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2a2634] px-8 py-6 rounded-t-lg flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <button className="bg-violet-500 py-3 px-4 text-white rounded hover:bg-violet-600 transition-colors flex items-center gap-2">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
