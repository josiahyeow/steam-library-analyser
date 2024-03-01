import { format } from "date-fns"
import { Game, getOwnedGames } from "../api/analyse/get-owned-games"

export default async function GameLibrary({
  params,
}: {
  params: { steamId: string }
}) {
  const { gameCount, games, mostPlayedGame, totalPlayTime } =
    await getOwnedGames({
      steamId: params.steamId,
    })

  return (
    <main className="flex min-h-screen flex-col justify-between p-8 sm:p-24 gap-8">
      <div className="flex flex-wrap gap-32 border border-zinc-800 rounded-lg p-4 bg-zinc-5">
        <div>
          <div className="font-bold text-3xl">{totalPlayTime.toFixed(1)}</div>
          <span className="text-sm">Total hours played</span>
        </div>
        <div>
          <div className="font-bold text-3xl">{gameCount}</div>
          <span className="text-sm">Number of Steam games</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-32 border border-zinc-800 rounded-lg p-4">
        <h2 className="font-bold">Most played game</h2>
        <div className="rounded-sm overflow-hidden">
          <div>
            <img
              src={mostPlayedGame.imgIconUrl}
              alt={mostPlayedGame.name}
              width={32}
              height={32}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold">{mostPlayedGame.name}</h3>
            <div>
              <h4 className="text-xs">Time played</h4>
              <div>{mostPlayedGame.playtimeHours.toFixed(1)} hours</div>
            </div>

            <div>
              <h4 className="text-xs">Last played on</h4>
              <div>{format(mostPlayedGame.lastPlayed, "d/M/yyyy")}</div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold">Owned games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-8">
        {games.map((game) => (
          <GameCard key={game.appId} game={game} />
        ))}
      </div>
    </main>
  )
}

function GameCard({ game }: { game: Game }) {
  return (
    <div className="flex gap-4 border border-zinc-800 p-4 rounded-md">
      <div className="rounded-sm overflow-hidden">
        <img src={game.imgIconUrl} alt={game.name} width={32} height={32} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold">{game.name}</h3>
        <div>
          <h4 className="text-xs">Time played</h4>
          <div>{game.playtimeHours.toFixed(1)} hours</div>
        </div>

        <div>
          <h4 className="text-xs">Last played on</h4>
          <div>{format(game.lastPlayed, "d/M/yyyy")}</div>
        </div>
      </div>
    </div>
  )
}
