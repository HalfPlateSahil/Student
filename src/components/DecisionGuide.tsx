import { Accessibility, BadgeCheck, FileCheck2, Route } from 'lucide-react'

type DecisionGuideProps = {
  regionName: string
}

const guideItems = [
  {
    title: 'Verify identity rules',
    detail: 'Check accepted ID, forms, address proof, and accessibility documents before the final week.',
    icon: FileCheck2,
  },
  {
    title: 'Choose the lowest-risk route',
    detail: 'Prefer the voting method that gives you the most buffer for travel, delivery, and corrections.',
    icon: Route,
  },
  {
    title: 'Plan support early',
    detail: 'Confirm language, disability, companion, postal, proxy, or overseas support with official staff.',
    icon: Accessibility,
  },
  {
    title: 'Confirm before you go',
    detail: 'Recheck the official source close to voting day because polling places and windows can change.',
    icon: BadgeCheck,
  },
]

export function DecisionGuide({ regionName }: DecisionGuideProps) {
  return (
    <section className="decision-guide" aria-labelledby="decision-guide-heading">
      <div className="section-title">
        <Route aria-hidden="true" size={22} />
        <div>
          <h2 id="decision-guide-heading">Safer voting route</h2>
          <p>Practical checks for {regionName}</p>
        </div>
      </div>
      <div className="decision-grid">
        {guideItems.map((item) => {
          const Icon = item.icon

          return (
            <article key={item.title}>
              <Icon aria-hidden="true" size={22} />
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
