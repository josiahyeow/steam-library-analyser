import { Game } from "../../services/steam/get-owned-games"
import { GameCard, MostPlayedTag } from "./game-card"

export function GamesList({
  games,
  mostPlayedGame,
}: {
  games: Game[]
  mostPlayedGame: Game
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
      {games.map((game) => (
        <GameCard
          key={game.appId}
          game={game}
          tag={game.appId === mostPlayedGame.appId ? <MostPlayedTag /> : null}
        />
      ))}
    </div>
  )
}
