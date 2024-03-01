"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button, Input } from "../components"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen max-w-xl m-auto flex-col p-24 bg-black text-white gap-8">
      <h1 className="text-3xl font-bold tracking-tighter text-balance">
        Analyse your Steam game library
      </h1>
      <SteamIdForm
        onSubmit={(steamId) => {
          router.push(`/${steamId}`)
        }}
      />
    </main>
  )
}

function SteamIdForm({ onSubmit }: { onSubmit: (steamId: string) => void }) {
  const [steamId, setSteamId] = useState("")

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(steamId)
      }}
      className="flex flex-col gap-8"
    >
      <Input
        id="steam-id"
        label="Steam ID"
        placeholder="Enter Steam ID"
        onChange={(e) => setSteamId(e.target.value)}
        required
        aria-label="Steam ID input field"
      ></Input>
      <Button type="submit" aria-label="submit steam id button">
        Analyse
      </Button>
    </form>
  )
}
