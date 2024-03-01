"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()
    const steamId = e.target[0].value
    router.push(`/${steamId}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit}>
        <label>
          Steam ID
          <input id="steam-id"></input>
        </label>
        <button type="submit">Analyse</button>
      </form>
    </main>
  )
}
