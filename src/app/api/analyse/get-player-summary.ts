import { steam } from "./steam/client"

export type Player = {
  steamId: string
  personaName: string
  profileUrl: string
  avatar: string
  avatarMedium: string
  avatarFull: string
}

export async function getPlayerSummary({ steamId }: { steamId: string }) {
  const { players } = await steam().getPlayerSummary({
    steamId,
  })

  const playerData = players[0]

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
