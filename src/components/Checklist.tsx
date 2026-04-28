import { ListChecks } from 'lucide-react'
import type { ChecklistItem } from '../types/election'

type ChecklistProps = {
  items: ChecklistItem[]
  completed: Record<string, boolean>
  progress: number
  onToggle: (id: string) => void
}

export function Checklist({ items, completed, progress, onToggle }: ChecklistProps) {
  return (
    <div className="checklist">
      <div className="section-title">
        <ListChecks aria-hidden="true" size={22} />
        <div>
          <h2>Your action checklist</h2>
          <p>{progress}% complete</p>
        </div>
      </div>
      <div className="progress" aria-label={`${progress}% complete`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      {items.map((item) => (
        <label className="check-item" key={item.id}>
          <input type="checkbox" checked={Boolean(completed[item.id])} onChange={() => onToggle(item.id)} />
          <span>
            <strong>
              {item.text}
              {item.urgent ? <em>Priority</em> : null}
            </strong>
            <small>{item.helper}</small>
          </span>
        </label>
      ))}
    </div>
  )
}
