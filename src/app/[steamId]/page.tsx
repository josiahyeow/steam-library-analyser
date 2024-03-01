import { getOwnedGames } from "../api/analyse/get-owned-games"

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Total playtime</h2>
      <div>{totalPlayTime.toFixed(1)} hours</div>
      <h2>Most played game</h2>
      <div>
        <img src={mostPlayedGame.imgIconUrl} alt={mostPlayedGame.name} />
        <div>
          <h3>{mostPlayedGame.name}</h3>
          <div>Playtime: {mostPlayedGame.playtimeHours.toFixed(1)} hours</div>
          <div>Last played: {mostPlayedGame.lastPlayed.toLocaleString()}</div>
        </div>
      </div>
      <h2>Owned games</h2>
      <div>
        {games.map((game) => (
          <div key={game.appId}>
            <img src={game.imgIconUrl} alt={game.name} />
            <div>
              <h3>{game.name}</h3>
              <div>Playtime: {game.playtimeHours.toFixed(1)} hours</div>
              <div>Last played: {game.lastPlayed.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      <div>Total: {gameCount}</div>
    </main>
  )
}
