import {
  CalendarPlus,
  Download,
  Languages,
  Mail,
  MapPinned,
  PlayCircle,
  Search,
  ShieldCheck,
  Table2,
} from 'lucide-react'
import type { GoogleAction } from '../types/election'

type GoogleActionHubProps = {
  actions: GoogleAction[]
  csvUrl: string
  calendarUrl: string
}

const iconById = {
  search: Search,
  maps: MapPinned,
  calendar: CalendarPlus,
  translate: Languages,
  youtube: PlayCircle,
  gmail: Mail,
  civic: ShieldCheck,
} as const

export function GoogleActionHub({ actions, csvUrl, calendarUrl }: GoogleActionHubProps) {
  return (
    <section className="google-hub" aria-labelledby="google-hub-heading">
      <div className="section-title">
        <ShieldCheck aria-hidden="true" size={22} />
        <div>
          <h2 id="google-hub-heading">Google action hub</h2>
          <p>Use familiar Google tools without exposing private app credentials.</p>
        </div>
      </div>

      <div className="google-action-grid">
        {actions.map((action) => {
          const Icon = iconById[action.id as keyof typeof iconById] ?? Search

          return (
            <a className="google-action" href={action.href} key={action.id} target="_blank" rel="noreferrer">
              <Icon aria-hidden="true" size={20} />
              <span>
                <strong>{action.label}</strong>
                <small>{action.description}</small>
              </span>
            </a>
          )
        })}
      </div>

      <div className="export-row">
        <a className="button button--soft" href={calendarUrl} target="_blank" rel="noreferrer">
          <CalendarPlus aria-hidden="true" size={18} /> Save reminder
        </a>
        <a className="button button--soft" href={csvUrl} download="civic-pathfinder-plan.csv">
          <Table2 aria-hidden="true" size={18} /> Export for Sheets
        </a>
        <a className="button button--soft" href={csvUrl} download="civic-pathfinder-plan.csv">
          <Download aria-hidden="true" size={18} /> Download plan
        </a>
      </div>
    </section>
  )
}
