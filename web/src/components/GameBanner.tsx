interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number
}

export function GameBanner({ adsCount, bannerUrl, title }: GameBannerProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
    >
      <img src={bannerUrl} alt={title} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
        <strong className="text-white font-bold block">{title}</strong>
        <span className="text-zinc-300 text-sm">{adsCount} anúncio(s)</span>
      </div>
    </a>
  )
}
