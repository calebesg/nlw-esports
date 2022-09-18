import { Divide, MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient mt-8 w-full rounded-t-3xl md:rounded-lg overflow-hidden">
      <div className="bg-[#2a2634] px-8 py-10 md:py-6 rounded-t-3xl md:rounded-t-lg flex flex-col md:flex-row md:justify-between text-center md:text-left items-center gap-10">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block mt-4 md:mt-0">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger>
          <button className="bg-violet-500 py-3 px-4 text-white rounded hover:bg-violet-600 transition-colors flex items-center gap-2">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </Dialog.Trigger>
      </div>
    </div>
  )
}
