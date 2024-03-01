import { NextRequest, NextResponse } from "next/server"
import { getOwnedGames } from "../../../services/steam"

export async function GET(request: NextRequest) {
  const steamId = request.nextUrl.searchParams.get("steamId")

  if (!steamId) {
    return NextResponse.json({ error: "steamId is required" }, { status: 400 })
  }

  const data = await getOwnedGames({ steamId })

  const analysis = {
    total_games_owned: data.gameCount,
    total_playtime: data.totalPlayTime,
    most_played_game: data.mostPlayedGame,
  }
  return NextResponse.json(analysis)
}
