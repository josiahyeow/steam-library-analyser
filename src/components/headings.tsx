export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-6xl font-display font-bold tracking-tighter">
      {children}
    </h1>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold">{children}</h2>
}
