import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Steam Game Library Analyser",
  description: "Analyse your Steam game library",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
