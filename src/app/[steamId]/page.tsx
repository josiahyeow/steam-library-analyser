import { format, isAfter } from "date-fns"
import Image from "next/image"
import { Game, getOwnedGames } from "../api/analyse/get-owned-games"
import { getPlayerSummary } from "../api/analyse/get-player-summary"

export default async function GameLibrary({
  params,
}: {
  params: { steamId: string }
}) {
  const { gameCount, games, mostPlayedGame, totalPlayTime } =
    await getOwnedGames({
      steamId: params.steamId,
    })
  const { player } = await getPlayerSummary({ steamId: params.steamId })

  return (
    <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 gap-16 bg-black text-white">
      <div className="flex justify-between">
        <div className="flex flex-col gap-8">
          <h1 className="text-6xl font-bold tracking-tighter">
            {player.personaName}
          </h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-8">
              <div>
                <span className="text-sm">Total hours played</span>

                <div className="font-bold text-3xl">
                  {totalPlayTime.toFixed(1)}
                </div>
              </div>
              <div>
                <span className="text-sm">Steam games</span>

                <div className="font-bold text-3xl">{gameCount}</div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/generated-image.jpg"
          width={500}
          height={500}
          alt="player generated image"
          className="aspect-square size-64"
        />
      </div>

      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold">Owned games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
          {[mostPlayedGame, ...games.slice(1, games.length)].map(
            (game, index) => (
              <GameCard
                key={game.appId}
                game={game}
                tag={index === 0 ? <MostPlayedTag /> : null}
              />
            )
          )}
        </div>
      </section>
    </main>
  )
}

function MostPlayedTag() {
  return (
    <div className="bg-white text-black px-2 py-1 rounded-sm text-xs">
      Most played
    </div>
  )
}

function GameCard({ game, tag }: { game: Game; tag?: React.ReactNode }) {
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
            <div>{playtime}</div>
          </div>

          <div>
            <h4 className="text-xs">Last played on</h4>
            <div>{lastPlayed}</div>
          </div>
        </div>
      </div>
    </a>
  )
}
