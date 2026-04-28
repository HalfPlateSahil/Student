import { ExternalLink, MapPin, Search, Vote } from 'lucide-react'
import { jurisdictionLabels, sourceLinks, statusLabels } from '../data/electionGuide'
import type { Jurisdiction, VoterStatus } from '../types/election'

type ProfilePanelProps = {
  jurisdiction: Jurisdiction
  status: VoterStatus
  address: string
  mapStatus: string
  mapsQuery: string
  civicInfoUrl: string
  onJurisdictionChange: (value: Jurisdiction) => void
  onStatusChange: (value: VoterStatus) => void
  onAddressChange: (value: string) => void
  onOpenMaps: () => void
}

export function ProfilePanel({
  jurisdiction,
  status,
  address,
  mapStatus,
  mapsQuery,
  civicInfoUrl,
  onJurisdictionChange,
  onStatusChange,
  onAddressChange,
  onOpenMaps,
}: ProfilePanelProps) {
  return (
    <aside className="control-panel" aria-labelledby="profile-heading">
      <div className="panel-heading">
        <Vote aria-hidden="true" size={22} />
        <div>
          <h2 id="profile-heading">Voter profile</h2>
          <p>Personalize the guide locally. Nothing here is stored or sent by this app.</p>
        </div>
      </div>

      <div className="field-grid">
        <label>
          <span>Election region</span>
          <select
            value={jurisdiction}
            onChange={(event) => onJurisdictionChange(event.target.value as Jurisdiction)}
          >
            {Object.entries(jurisdictionLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Current situation</span>
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value as VoterStatus)}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>Address or locality</span>
        <div className="search-box">
          <Search aria-hidden="true" size={18} />
          <input
            type="search"
            value={address}
            onChange={(event) => onAddressChange(event.target.value)}
            placeholder="City, ZIP, district, or constituency"
            autoComplete="street-address"
          />
        </div>
      </label>

      <div className="google-tools">
        <button className="tool-link" type="button" onClick={onOpenMaps} aria-describedby="maps-helper">
          <MapPin aria-hidden="true" size={18} /> Open nearby election offices
        </button>
        <p className="helper-text" id="maps-helper" aria-live="polite">
          {mapStatus || `Opens Google Maps in this tab for "${mapsQuery}".`}
        </p>
        <details>
          <summary>Google Civic Info API helper</summary>
          <code>{civicInfoUrl}</code>
        </details>
      </div>

      <div className="source-list" aria-label="Recommended official sources">
        <h3>Official starting points</h3>
        {sourceLinks[jurisdiction].map((source) => (
          <a href={source.href} key={source.href} target="_blank" rel="noreferrer">
            <span>
              <strong>{source.label}</strong>
              <small>{source.description}</small>
            </span>
            <ExternalLink aria-hidden="true" size={16} />
          </a>
        ))}
      </div>
    </aside>
  )
}
