import { GetOwnedGamesResponse, GetPlayerSummariesResponse } from "./types"

const API_BASEPATH = process.env.STEAM_API_BASEPATH!
const API_KEY = process.env.STEAM_API_KEY!

export function steam(
  { apiBasepath, apiKey } = {
    apiBasepath: API_BASEPATH,
    apiKey: API_KEY,
  }
) {
  const request = async ({
    url,
    params,
  }: {
    url: string
    params: { [key: string]: any }
  }) => {
    const endpoint = new URL(url, apiBasepath)

    const search = new URLSearchParams({
      key: apiKey,
      steamid: params.steamId,
      format: "json",
      ...params,
    })

    endpoint.search = search.toString()

    const response = await fetch(endpoint.toString())
    return await response.json()
  }

  const getOwnedGames = async ({
    steamId,
  }: {
    steamId: string
  }): Promise<GetOwnedGamesResponse> => {
    const { response } = await request({
      url: "/IPlayerService/GetOwnedGames/v0001/",
      params: { steamId, include_appinfo: "1" },
    })
    return response
  }

  const getPlayerSummary = async ({
    steamId,
  }: {
    steamId: string
  }): Promise<GetPlayerSummariesResponse> => {
    const { response } = await request({
      url: "/ISteamUser/GetPlayerSummaries/v0002/",
      params: { steamids: steamId },
    })
    return response
  }

  return { getOwnedGames, getPlayerSummary }
}
