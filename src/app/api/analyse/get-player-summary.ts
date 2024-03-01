const API_BASEPATH = process.env.STEAM_API_BASEPATH
const API_KEY = process.env.STEAM_API_KEY

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
  response: {
    players: PlayerSummaryData[]
  }
}

type Player = {
  steamId: string
  personaName: string
  profileUrl: string
  avatar: string
  avatarMedium: string
  avatarFull: string
}

export async function getPlayerSummary({ steamId }: { steamId: string }) {
  const endpoint = new URL(
    "/ISteamUser/GetPlayerSummaries/v0002/",
    API_BASEPATH
  )

  const params = new URLSearchParams({
    key: API_KEY!,
    steamids: steamId,
    include_appinfo: "1",
    format: "json",
  })

  endpoint.search = params.toString()

  const response = await fetch(endpoint.toString())
  const data: GetPlayerSummariesResponse = await response.json()

  const playerData = data.response.players[0]

  const player: Player = {
    steamId: playerData.steamid,
    personaName: playerData.personaname,
    profileUrl: playerData.profileurl,
    avatar: playerData.avatar,
    avatarMedium: playerData.avatarmedium,
    avatarFull: playerData.avatarfull,
  }

  return {
    player,
  }
}
