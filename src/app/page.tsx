"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button, H1, Input } from "../components"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex justify-center h-screen max-w-xl m-auto flex-col p-8 sm:p-24 bg-black text-white gap-8">
      <div className="flex flex-col gap-16 -mt-64">
        <H1>Analyse your Steam game library</H1>
        <SteamIdForm
          onSubmit={(steamId) => {
            router.push(`/${steamId}`)
          }}
        />
      </div>
    </main>
  )
}

function SteamIdForm({ onSubmit }: { onSubmit: (steamId: string) => void }) {
  const [steamId, setSteamId] = useState("")

  return (
    <form
      onSubmit={(e) => {
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
