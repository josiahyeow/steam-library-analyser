"use client"

const buttonStyles =
  "bg-white text-black p-3 rounded-md text-center font-bold sm:min-w-64 hover:ring-2 ring-white transition-all border:none"

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
