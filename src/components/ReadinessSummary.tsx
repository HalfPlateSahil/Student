import { CheckCircle2, ShieldCheck, TimerReset } from 'lucide-react'

type ReadinessSummaryProps = {
  progress: number
  completedCount: number
  totalCount: number
}

export function ReadinessSummary({ progress, completedCount, totalCount }: ReadinessSummaryProps) {
  const nextMessage =
    progress === 100
      ? 'Your plan is ready. Recheck official dates close to voting day.'
      : 'Keep going through the checklist, then verify dates with the official source.'

  return (
    <div className="trust-card">
      <CheckCircle2 aria-hidden="true" size={28} />
      <h2>Readiness snapshot</h2>
      <div className="readiness-score">
        <strong>{progress}%</strong>
        <span>
          {completedCount} of {totalCount} actions complete
        </span>
      </div>
      <p>{nextMessage}</p>
      <div className="trust-points">
        <span>
          <ShieldCheck aria-hidden="true" size={16} /> No sensitive data stored
        </span>
        <span>
          <TimerReset aria-hidden="true" size={16} /> Built around deadline buffers
        </span>
      </div>
    </div>
  )
}
