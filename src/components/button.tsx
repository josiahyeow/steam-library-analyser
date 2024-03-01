"use client"

import Link from "next/link"

const buttonStyles =
  "bg-white text-black p-3 rounded-md text-center font-bold sm:min-w-64 hover:ring ring-white/40 hover:shadow-lg hover:shadow-white/30 transition-all border:none"

export function Button({
  children,
  ...rest
}: { children: React.ReactNode } & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      type={rest.type as "button" | "submit" | "reset" | undefined}
      className={`${buttonStyles} ${rest.className}`}
    >
      {children}
    </button>
  )
}

export function LinkButton({
  href,
  children,
  ...rest
}: {
  href: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} {...rest}>
      <div className={`${buttonStyles} ${rest.className}`}>{children}</div>
    </Link>
  )
}
