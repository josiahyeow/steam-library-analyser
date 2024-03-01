import { H1, H2 } from "../../components/headings"
import { getOwnedGames } from "../api/analyse/get-owned-games"
import { getPlayerSummary } from "../api/analyse/get-player-summary"
import { GamesList } from "./games-list"
import { GeneratedImage } from "./generated-image"
import { KeyMetric } from "./key-metric"

export default async function Analysis({
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
          <H1>{player.personaName}</H1>
          <div className="flex flex-row gap-8">
            <KeyMetric
              label="Total hours played"
              value={totalPlayTime.toFixed(1)}
            />
            <KeyMetric label="Games owned" value={gameCount.toFixed(0)} />
          </div>
        </div>
        <div className="sm:max-w-[256px]">
          <GeneratedImage />
        </div>
      </div>
      <section className="flex flex-col gap-8">
        <H2>Owned games</H2>
        <GamesList games={games} mostPlayedGame={mostPlayedGame} />
      </section>
    </main>
  )
}
