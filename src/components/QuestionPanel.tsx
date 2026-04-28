import { Languages, ShieldCheck } from 'lucide-react'
import type { Question } from '../types/election'

type QuestionPanelProps = {
  questions: Question[]
  activeQuestion: number
  onSelect: (index: number) => void
}

export function QuestionPanel({ questions, activeQuestion, onSelect }: QuestionPanelProps) {
  const current = questions[activeQuestion]

  return (
    <div className="qa-panel">
      <div className="section-title">
        <Languages aria-hidden="true" size={22} />
        <div>
          <h2>Plain-language answers</h2>
          <p>Tap a common question</p>
        </div>
      </div>
      <div className="question-tabs" role="tablist" aria-label="Election questions">
        {questions.map((item, index) => (
          <button
            key={item.q}
            type="button"
            role="tab"
            aria-selected={activeQuestion === index}
            onClick={() => onSelect(index)}
          >
            {item.q}
          </button>
        ))}
      </div>
      <article className="answer-card">
        <ShieldCheck aria-hidden="true" size={28} />
        <h3>{current.q}</h3>
        <p>{current.a}</p>
      </article>
    </div>
  )
}
