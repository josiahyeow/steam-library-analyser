import { format, isAfter } from "date-fns"
import Icon from "feather-icons-react"
import Image from "next/image"
import { Game } from "../api/analyse/get-owned-games"

export function GameCard({ game, tag }: { game: Game; tag?: React.ReactNode }) {
  const playtime =
    game.playtimeHours > 0 ? `${game.playtimeHours.toFixed(1)} hours` : "-"
  const lastPlayed = isAfter(game.lastPlayed, new Date("1970-01-01"))
    ? format(game.lastPlayed, "d/M/yyyy")
    : "-"

  return (
    <a
      href={game.storeUrl}
      target="_blank"
      className="overflow-hidden flex flex-col border-2 border-zinc-900 rounded-md hover:ring ring-white/80 hover:shadow-lg hover:shadow-white/30 transition-all"
    >
      <div>
        <Image
          src={game.imgHeroUrl}
          alt={game.name}
          width={500}
          height={250}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-4">
          <h3 className="font-bold">{game.name}</h3>
          {tag && <div className="">{tag}</div>}
        </div>
        <div className="flex flex-row gap-8">
          <div>
            <h4 className="text-xs">Time played</h4>
            <div className="flex flex-row justify-center items-center gap-2">
              <Icon icon="clock" size={16} />
              {playtime}
            </div>
          </div>
          <div>
            <h4 className="text-xs">Last played on</h4>
            <div className="flex flex-row justify-center items-center gap-2">
              <Icon icon="calendar" size={16} />
              {lastPlayed}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export function MostPlayedTag() {
  return (
    <div className="bg-white text-black px-2 py-1 rounded-sm text-xs">
      Most played
    </div>
  )
}
