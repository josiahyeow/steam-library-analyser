export function H1(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      className={`${props.className} text-6xl font-display font-bold tracking-tighter`}
    >
      {props.children}
    </h1>
  )
}

export function H2(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h2 className={`text-2xl font-bold ${props.className}`}>
      {props.children}
    </h2>
  )
}
