import { fromUnixTime } from "date-fns"

const API_BASEPATH = process.env.STEAM_API_BASEPATH
const API_KEY = process.env.STEAM_API_KEY

type OwnedGameData = {
  appid: number
  name: string
  playtime_forever: number
  img_icon_url: string
  has_community_visible_stats: boolean
  playtime_windows_forever: number
  playtime_mac_forever: number
  playtime_linux_forever: number
  rtime_last_played: number
  playtime_disconnected: number
}

type OwnedGamesResponse = {
  response: {
    game_count: number
    games: OwnedGameData[]
  }
}

export type Game = {
  appId: string
  name: string
  playtimeHours: number
  imgIconUrl: string
  imgHeroUrl: string
  lastPlayed: Date
  storeUrl: string
}

export async function getOwnedGames({ steamId }: { steamId: string }) {
  const endpoint = new URL("/IPlayerService/GetOwnedGames/v0001/", API_BASEPATH)

  const params = new URLSearchParams({
    key: API_KEY!,
    steamid: steamId,
    include_appinfo: "1",
    format: "json",
  })

  endpoint.search = params.toString()

  const response = await fetch(endpoint.toString())
  const data: OwnedGamesResponse = await response.json()

  const gameCount = data.response.game_count

  const games: Game[] = data.response.games
    .map((game) => ({
      appId: game.appid.toString(),
      name: game.name,
      playtimeHours: game.playtime_forever / 60,
      imgIconUrl: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
      imgHeroUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
      lastPlayed: fromUnixTime(game.rtime_last_played),
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
    gameCount,
    games,
    mostPlayedGame,
    totalPlayTime,
  }
}
