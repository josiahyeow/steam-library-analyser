import { getUnixTime } from "date-fns"
import { getOwnedGames } from "./get-owned-games"
import { steam } from "./steam/client"

jest.mock("./steam/client")

describe("get owned games", () => {
  beforeEach(() => {
    jest.resetAllMocks()

    jest.mocked(steam).mockReturnValue({
      getOwnedGames: jest.fn().mockResolvedValue({
        game_count: 2,
        games: [
          {
            appid: 1,
            name: "Half-Life 2",
            playtime_forever: 60,
            img_icon_url: "asdf",
            rtime_last_played: getUnixTime(new Date("2020-01-02")),
          },
          {
            appid: 2,
            name: "Team Fortress 2",
            playtime_forever: 126,
            img_icon_url: "fdas",
            rtime_last_played: getUnixTime(new Date("2019-12-11")),
          },
        ],
      }),
    } as any)
  })

  it("returns the owned games", async () => {
    const steamId = "your-steam-id"
    const result = await getOwnedGames({ steamId })

    expect(result.games).toEqual([
      {
        appId: "2",
        name: "Team Fortress 2",
        playtimeHours: 2.1,
        imgIconUrl:
          "http://media.steampowered.com/steamcommunity/public/images/apps/2/fdas.jpg",
        imgHeroUrl:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/2/header.jpg",
        lastPlayed: new Date("2019-12-11"),
        storeUrl: "https://store.steampowered.com/app/2",
      },
      {
        appId: "1",
        name: "Half-Life 2",
        playtimeHours: 1,
        imgIconUrl:
          "http://media.steampowered.com/steamcommunity/public/images/apps/1/asdf.jpg",
        imgHeroUrl:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1/header.jpg",
        lastPlayed: new Date("2020-01-02"),
        storeUrl: "https://store.steampowered.com/app/1",
      },
    ])
  })

  it("returns games sorted by most played", async () => {
    const steamId = "your-steam-id"
    const result = await getOwnedGames({ steamId })

    expect(result.games[0].appId).toBe("2")
    expect(result.games[1].appId).toBe("1")
  })

  it("returns game count", async () => {
    const steamId = "your-steam-id"
    const result = await getOwnedGames({ steamId })

    expect(result.gameCount).toBe(2)
  })

  it("returns the most played game", async () => {
    const steamId = "your-steam-id"
    const result = await getOwnedGames({ steamId })

    expect(result.mostPlayedGame).toEqual({
      appId: "2",
      name: "Team Fortress 2",
      playtimeHours: 2.1,
      imgIconUrl:
        "http://media.steampowered.com/steamcommunity/public/images/apps/2/fdas.jpg",
      imgHeroUrl:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2/header.jpg",
      lastPlayed: new Date("2019-12-11"),
      storeUrl: "https://store.steampowered.com/app/2",
    })
  })

  it("returns total play time", async () => {
    const steamId = "your-steam-id"
    const result = await getOwnedGames({ steamId })

    expect(result.totalPlayTime).toBe(3.1)
  })
})
