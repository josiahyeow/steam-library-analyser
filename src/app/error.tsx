"use client"

import { H2, LinkButton } from "../components"

export default function Error() {
  return (
    <main className="flex justify-center h-screen max-w-xl m-auto flex-col p-8 sm:p-24 bg-black text-white gap-8">
      <div className="flex flex-col -mt-64 mb-8">
        <H2 className="mb-4">Unable to analyse that Steam account</H2>
        <p>
          This could be due to the account being private or some unexpected
          error.
        </p>
      </div>
      <LinkButton href="/">Go back</LinkButton>
    </main>
  )
}
