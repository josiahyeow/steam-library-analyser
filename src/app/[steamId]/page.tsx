import { getOwnedGames, getPlayerSummary } from "../../services/steam"
import { Analysis } from "./analysis"

export default async function AnalysisPage({
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
    <Analysis
      data={{
        gameCount,
        games,
        mostPlayedGame,
        totalPlayTime,
        ...player,
      }}
    />
  )
}
