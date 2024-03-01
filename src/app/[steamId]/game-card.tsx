import { format, isAfter } from "date-fns"
import Icon from "feather-icons-react"
import Image from "next/image"
import { useMemo } from "react"
import { Game } from "../../services/steam/get-owned-games"

export function GameCard({ game, tag }: { game: Game; tag?: React.ReactNode }) {
  const playtime = useMemo(() => {
    if (game.playtimeHours < 0) {
      return "-"
    }

    if (game.playtimeHours === 1) {
      return `${game.playtimeHours.toFixed(0)} hour`
    }

    return `${game.playtimeHours.toFixed(1)} hours`
  }, [game.playtimeHours])

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
          <GameMetric label="Time played" value={playtime} />
          <GameMetric label="Last played on" value={lastPlayed} />
        </div>
      </div>
    </a>
  )
}

function GameMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-xs">{label}</h4>
      <div className="flex flex-row justify-start items-center gap-2">
        <Icon icon="clock" size={16} />
        {value}
      </div>
    </div>
  )
}

export function MostPlayedTag() {
  return (
    <div className="bg-white text-black px-2 py-1 rounded-sm text-xs">
      Most played
    </div>
  )
}
