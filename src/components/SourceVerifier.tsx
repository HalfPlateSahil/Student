import { ShieldQuestion } from 'lucide-react'
import type { SourceRating } from '../lib/sourceQuality'

type SourceVerifierProps = {
  sourceUrl: string
  rating: SourceRating
  onSourceUrlChange: (value: string) => void
}

export function SourceVerifier({ sourceUrl, rating, onSourceUrlChange }: SourceVerifierProps) {
  return (
    <section className="source-verifier" aria-labelledby="source-verifier-heading">
      <div className="section-title">
        <ShieldQuestion aria-hidden="true" size={22} />
        <div>
          <h2 id="source-verifier-heading">Source verifier</h2>
          <p>Check whether a link looks official before acting on it.</p>
        </div>
      </div>

      <label>
        <span>Election information link</span>
        <input
          type="url"
          value={sourceUrl}
          onChange={(event) => onSourceUrlChange(event.target.value)}
          placeholder="https://example.gov/..."
        />
      </label>

      <div className={`source-rating source-rating--${rating.tone}`} role="status">
        <strong>{rating.label}</strong>
        <p>{rating.guidance}</p>
      </div>
    </section>
  )
}
