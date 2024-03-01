export function KeyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-sm">{label}</span>
      <div className="font-bold text-3xl">{value}</div>
    </div>
  )
}
