type PlayerSummaryData = {
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  lastlogoff: number
  personastate: number
  primaryclanid: string
  timecreated: number
  personastateflags: number
}

type GetPlayerSummariesResponse = {
  players: PlayerSummaryData[]
}

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

type GetOwnedGamesResponse = {
  game_count: number
  games: OwnedGameData[]
}

export type {
  GetOwnedGamesResponse,
  GetPlayerSummariesResponse,
  OwnedGameData,
  PlayerSummaryData,
}
