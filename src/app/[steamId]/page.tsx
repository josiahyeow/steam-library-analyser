import Icon from "feather-icons-react"
import Image from "next/image"
import { getOwnedGames } from "../api/analyse/get-owned-games"
import { getPlayerSummary } from "../api/analyse/get-player-summary"
import { GameCard, MostPlayedTag } from "./game-card"

export default async function GameLibrary({
  params,
}: {
  params: { steamId: string }
}) {
  const [{ gameCount, games, mostPlayedGame, totalPlayTime }, { player }] =
    await Promise.all([
      getOwnedGames({
        steamId: params.steamId,
      }),
      getPlayerSummary({ steamId: params.steamId }),
    ])

  return (
    <main className="flex min-h-screen max-w-6xl m-auto flex-col justify-between p-8 sm:p-24 gap-16 bg-black text-white">
      <div className="flex flex-col gap-8 flex-col-reverse sm:flex-row justify-between">
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
                <span className="text-sm">Games owned</span>

                <div className="font-bold text-3xl">{gameCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:max-w-[256px]">
          <Image
            src="/generated-image.jpg"
            width={500}
            height={500}
            alt="player generated image"
            className="aspect-square w-full sm:size-64"
          />
          <div className="flex flex-row gap-2">
            <Icon icon="hexagon" size={16} />
            <span className="text-xs leading-snug">
              This image is unique to you and was generated based on your game
              library analysis.
            </span>
          </div>
        </div>
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
