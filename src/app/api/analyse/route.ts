import { NextRequest, NextResponse } from "next/server"
import { getOwnedGames } from "./get-owned-games"

export async function GET(request: NextRequest) {
  const steamId = request.nextUrl.searchParams.get("steamId")

  if (!steamId) {
    return NextResponse.json({ error: "steamId is required" }, { status: 400 })
  }

  const data = await getOwnedGames({ steamId })
  return NextResponse.json(data)
}
