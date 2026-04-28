import { useMemo, useState } from 'react'
import { Checklist } from './components/Checklist'
import { Hero } from './components/Hero'
import { ProfilePanel } from './components/ProfilePanel'
import { QuestionPanel } from './components/QuestionPanel'
import { ReadinessSummary } from './components/ReadinessSummary'
import { Timeline } from './components/Timeline'
import { jurisdictionLabels, processByJurisdiction, questions } from './data/electionGuide'
import { buildChecklist } from './lib/checklist'
import { buildCivicInfoHelperUrl, buildGoogleCalendarUrl, buildMapsSearch } from './lib/google'
import type { Jurisdiction, VoterStatus } from './types/election'
import './App.css'

function App() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('india')
  const [status, setStatus] = useState<VoterStatus>('new')
  const [searchAddress, setSearchAddress] = useState('Mumbai')
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [mapStatus, setMapStatus] = useState('')

  const steps = processByJurisdiction[jurisdiction]
  const checklist = useMemo(() => buildChecklist(status, jurisdiction), [status, jurisdiction])
  const doneCount = checklist.filter((item) => completed[item.id]).length
  const progress = Math.round((doneCount / checklist.length) * 100)
  const mapsSearch = buildMapsSearch(searchAddress)
  const civicInfoUrl = buildCivicInfoHelperUrl(searchAddress)
  const calendarUrl = buildGoogleCalendarUrl(
    'Review election deadlines',
    'Check registration, ballot, early voting, and polling dates from your official election authority.',
  )

  const openElectionOffices = () => {
    setMapStatus(`Opening Google Maps for "${mapsSearch.query}"...`)
    window.location.assign(mapsSearch.url)
  }

  const toggleChecklistItem = (id: string) => {
    setCompleted((current) => ({ ...current, [id]: !current[id] }))
  }

  return (
    <main>
      <Hero steps={steps} calendarUrl={calendarUrl} />

      <section className="assistant-grid" id="assistant">
        <ProfilePanel
          jurisdiction={jurisdiction}
          status={status}
          address={searchAddress}
          mapStatus={mapStatus}
          mapsQuery={mapsSearch.query}
          civicInfoUrl={civicInfoUrl}
          onJurisdictionChange={setJurisdiction}
          onStatusChange={setStatus}
          onAddressChange={setSearchAddress}
          onOpenMaps={openElectionOffices}
        />
        <Timeline title={jurisdictionLabels[jurisdiction]} steps={steps} />
      </section>

      <section className="workbench" aria-label="Interactive assistant tools">
        <Checklist
          items={checklist}
          completed={completed}
          progress={progress}
          onToggle={toggleChecklistItem}
        />
        <QuestionPanel
          questions={questions}
          activeQuestion={activeQuestion}
          onSelect={setActiveQuestion}
        />
        <ReadinessSummary
          progress={progress}
          completedCount={doneCount}
          totalCount={checklist.length}
        />
      </section>
    </main>
  )
}

export default App
