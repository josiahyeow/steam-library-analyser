import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Analysis } from "./page"

jest.mock("../api/analyse")

describe("Analysis page", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    const data = {
      gameCount: 2,
      games: [
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
      ],
      mostPlayedGame: {
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
      totalPlayTime: 3.1,
      personaName: "Gamer120",
    } as any

    render(<Analysis data={data} />)
  })

  it("shows gamer tag", async () => {
    expect(screen.getByText("Gamer120")).toBeInTheDocument()
  })

  it("shows total play time", async () => {
    expect(screen.getByText("3.1")).toBeInTheDocument()
  })

  it("shows game count", async () => {
    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("shows most played game", async () => {
    expect(screen.getByText("Team Fortress 2")).toBeInTheDocument()
    expect(screen.getByText("Most played")).toBeInTheDocument()
  })

  it("shows games list", async () => {
    expect(screen.getByText("Half-Life 2")).toBeInTheDocument()
    expect(screen.getByText("Team Fortress 2")).toBeInTheDocument()

    expect(screen.getAllByText("Time played")).toHaveLength(2)
    expect(screen.getAllByText("Last played on")).toHaveLength(2)

    expect(screen.getByText("2.1 hours")).toBeInTheDocument()
    expect(screen.getByText("1 hour")).toBeInTheDocument()
  })
})
