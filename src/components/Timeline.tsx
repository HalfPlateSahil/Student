import { Clock3 } from 'lucide-react'
import type { ProcessStep } from '../types/election'

type TimelineProps = {
  title: string
  steps: ProcessStep[]
}

export function Timeline({ title, steps }: TimelineProps) {
  return (
    <section className="timeline" aria-labelledby="timeline-heading">
      <div className="section-title">
        <Clock3 aria-hidden="true" size={22} />
        <div>
          <h2 id="timeline-heading">Timeline map</h2>
          <p>{title} process overview</p>
        </div>
      </div>
      <ol>
        {steps.map((step) => (
          <li key={step.title}>
            <div className="timeline-marker" aria-hidden="true" />
            <article>
              <span>{step.timing}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
              <strong>{step.action}</strong>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
