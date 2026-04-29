import { CalendarClock } from 'lucide-react'

type DeadlinePlannerProps = {
  electionDate: string
  onElectionDateChange: (value: string) => void
}

const offsets = [
  { label: 'Registration check', days: 30 },
  { label: 'Document review', days: 14 },
  { label: 'Route and support plan', days: 7 },
  { label: 'Final official-source check', days: 2 },
]

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function DeadlinePlanner({ electionDate, onElectionDateChange }: DeadlinePlannerProps) {
  const reminders = electionDate
    ? offsets.map((item) => {
        const date = new Date(`${electionDate}T12:00:00`)
        date.setDate(date.getDate() - item.days)
        return { ...item, date }
      })
    : []

  return (
    <section className="deadline-planner" aria-labelledby="deadline-planner-heading">
      <div className="section-title">
        <CalendarClock aria-hidden="true" size={22} />
        <div>
          <h2 id="deadline-planner-heading">Deadline planner</h2>
          <p>Create a practical buffer around the election date.</p>
        </div>
      </div>

      <label>
        <span>Election or polling date</span>
        <input
          type="date"
          value={electionDate}
          onChange={(event) => onElectionDateChange(event.target.value)}
        />
      </label>

      {reminders.length > 0 ? (
        <ol className="reminder-list">
          {reminders.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{formatDate(item.date)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="helper-text">Add a date to generate suggested preparation checkpoints.</p>
      )}
    </section>
  )
}
