import { H1, H2 } from "../../components/headings"
import { GamesAnalysis, Player } from "../../services/steam"
import { GamesList } from "./games-list"
import { GeneratedImage } from "./generated-image"
import { KeyMetric } from "./key-metric"

export function Analysis({ data }: { data: GamesAnalysis & Player }) {
  return (
    <main className="flex min-h-screen max-w-6xl m-auto flex-col justify-between p-8 sm:p-24 gap-16 bg-black text-white">
      <div className="flex flex-col gap-8 flex-col-reverse sm:flex-row justify-between">
        <div className="flex flex-col gap-8">
          <H1>{data.personaName}</H1>
          <div className="flex flex-row gap-8">
            <KeyMetric
              label="Total hours played"
              value={data.totalPlayTime.toFixed(1)}
            />
            <KeyMetric label="Games owned" value={data.gameCount.toFixed(0)} />
          </div>
        </div>
        <div className="sm:max-w-[256px]">
          <GeneratedImage />
        </div>
      </div>
      <section className="flex flex-col gap-8">
        <H2>Owned games</H2>
        <GamesList games={data.games} mostPlayedGame={data.mostPlayedGame} />
      </section>
    </main>
  )
}
