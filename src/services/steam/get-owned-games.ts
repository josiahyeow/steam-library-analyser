import { fromUnixTime } from "date-fns"
import { steamClient } from "./client"

export type Game = {
  appId: string
  name: string
  playtimeHours: number
  imgIconUrl: string
  imgHeroUrl: string
  lastPlayed: Date | null
  storeUrl: string
}

export type GamesAnalysis = {
  gameCount: number
  games: Game[]
  mostPlayedGame: Game
  totalPlayTime: number
}

export async function getOwnedGames({
  steamId,
}: {
  steamId: string
}): Promise<GamesAnalysis> {
  const { game_count, games: _games } = await steamClient().getOwnedGames({
    steamId,
  })

  const games: Game[] = _games
    .map((game) => ({
      appId: game.appid.toString(),
      name: game.name,
      playtimeHours: game.playtime_forever / 60,
      imgIconUrl: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
      imgHeroUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
      lastPlayed: game.rtime_last_played
        ? fromUnixTime(game.rtime_last_played)
        : null,
      storeUrl: `https://store.steampowered.com/app/${game.appid}`,
    }))
    .sort((a, b) => b.playtimeHours - a.playtimeHours)

  const mostPlayedGame = games.reduce((mostPlayed, game) => {
    if (game.playtimeHours > mostPlayed.playtimeHours) {
      return game
    }
    return mostPlayed
  })

  const totalPlayTime = games.reduce(
    (total, game) => total + game.playtimeHours,
    0
  )

  return {
    gameCount: game_count,
    games,
    mostPlayedGame,
    totalPlayTime,
  }
}
