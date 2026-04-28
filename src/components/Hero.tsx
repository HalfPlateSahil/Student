import { CalendarPlus, ChevronRight, Sparkles } from 'lucide-react'
import type { ProcessStep } from '../types/election'

type HeroProps = {
  steps: ProcessStep[]
  calendarUrl: string
}

export function Hero({ steps, calendarUrl }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="page-title">
      <div className="hero__content">
        <p className="eyebrow">
          <Sparkles aria-hidden="true" size={18} /> Civic pathfinder
        </p>
        <h1 id="page-title">Election guidance that turns confusion into a clear plan.</h1>
        <p className="hero__copy">
          Build a local voting checklist, understand each stage, save reminders, and move through
          official-source guidance without handing over sensitive personal data.
        </p>
        <div className="hero__actions" aria-label="Primary actions">
          <a className="button button--primary" href="#assistant">
            Start guide <ChevronRight aria-hidden="true" size={18} />
          </a>
          <a className="button button--ghost" href={calendarUrl} target="_blank" rel="noreferrer">
            <CalendarPlus aria-hidden="true" size={18} /> Add reminder
          </a>
        </div>
      </div>
      <div className="hero__panel" aria-label="Election journey overview">
        <div className="hero__panel-header">
          <strong>Journey preview</strong>
          <span>{steps.length} guided stages</span>
        </div>
        {steps.slice(0, 4).map((step, index) => (
          <div className="journey-dot" key={step.title}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.title}</strong>
              <small>{step.timing}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
