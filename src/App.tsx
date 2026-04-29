import { useMemo, useState } from 'react'
import { Checklist } from './components/Checklist'
import { DeadlinePlanner } from './components/DeadlinePlanner'
import { DecisionGuide } from './components/DecisionGuide'
import { GoogleActionHub } from './components/GoogleActionHub'
import { Hero } from './components/Hero'
import { ProfilePanel } from './components/ProfilePanel'
import { QuestionPanel } from './components/QuestionPanel'
import { ReadinessSummary } from './components/ReadinessSummary'
import { SourceVerifier } from './components/SourceVerifier'
import { Timeline } from './components/Timeline'
import { jurisdictionLabels, processByJurisdiction, questions } from './data/electionGuide'
import { buildChecklist } from './lib/checklist'
import {
  buildCivicInfoHelperUrl,
  buildGmailComposeUrl,
  buildGoogleCalendarUrl,
  buildGoogleSearchUrl,
  buildGoogleSheetsCsvDataUrl,
  buildGoogleTranslateUrl,
  buildMapsSearch,
  buildYouTubeSearchUrl,
} from './lib/google'
import { rateElectionSource } from './lib/sourceQuality'
import { usePersistentState } from './lib/storage'
import type { Jurisdiction, VoterStatus } from './types/election'
import './App.css'

function App() {
  const [jurisdiction, setJurisdiction] = usePersistentState<Jurisdiction>('cp:jurisdiction', 'india')
  const [status, setStatus] = usePersistentState<VoterStatus>('cp:status', 'new')
  const [searchAddress, setSearchAddress] = usePersistentState('cp:address', 'Mumbai')
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [completed, setCompleted] = usePersistentState<Record<string, boolean>>('cp:completed', {})
  const [electionDate, setElectionDate] = usePersistentState('cp:electionDate', '')
  const [sourceUrl, setSourceUrl] = usePersistentState('cp:sourceUrl', '')
  const [mapStatus, setMapStatus] = useState('')

  const steps = processByJurisdiction[jurisdiction]
  const checklist = useMemo(() => buildChecklist(status, jurisdiction), [status, jurisdiction])
  const doneCount = checklist.filter((item) => completed[item.id]).length
  const progress = Math.round((doneCount / checklist.length) * 100)
  const mapsSearch = buildMapsSearch(searchAddress)
  const civicInfoUrl = buildCivicInfoHelperUrl(searchAddress)
  const sourceRating = rateElectionSource(sourceUrl)
  const calendarUrl = buildGoogleCalendarUrl(
    'Review election deadlines',
    'Check registration, ballot, early voting, and polling dates from your official election authority.',
  )
  const planRows = [
    ['Region', jurisdictionLabels[jurisdiction]],
    ['Situation', status],
    ['Locality', searchAddress],
    ['Checklist progress', `${progress}%`],
    ...checklist.map((item) => [completed[item.id] ? 'Done' : 'Open', item.text, item.helper]),
  ]
  const csvUrl = buildGoogleSheetsCsvDataUrl(planRows)
  const shareBody = [
    'Here is my Civic Pathfinder election plan:',
    `Region: ${jurisdictionLabels[jurisdiction]}`,
    `Locality: ${searchAddress || 'Not specified'}`,
    `Progress: ${progress}%`,
    '',
    'I will verify final deadlines and documents with the official election authority.',
  ].join('\n')
  const googleActions = [
    {
      id: 'search',
      label: 'Official Google Search',
      description: 'Search for election authority pages tied to your locality.',
      href: buildGoogleSearchUrl(searchAddress),
    },
    {
      id: 'maps',
      label: 'Google Maps',
      description: 'Find nearby election offices and civic service centers.',
      href: mapsSearch.url,
    },
    {
      id: 'translate',
      label: 'Google Translate',
      description: 'Translate the checklist into Hindi for easier review.',
      href: buildGoogleTranslateUrl(checklist.map((item) => item.text).join('\n')),
    },
    {
      id: 'youtube',
      label: 'YouTube learning',
      description: 'Search for official voter education videos.',
      href: buildYouTubeSearchUrl(searchAddress),
    },
    {
      id: 'gmail',
      label: 'Gmail share draft',
      description: 'Prepare a shareable plan for a family member or helper.',
      href: buildGmailComposeUrl('My Civic Pathfinder election plan', shareBody),
    },
  ]

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

      <section className="intelligence-grid" aria-label="Planning and Google tools">
        <DecisionGuide regionName={jurisdictionLabels[jurisdiction]} />
        <GoogleActionHub actions={googleActions} csvUrl={csvUrl} calendarUrl={calendarUrl} />
      </section>

      <section className="planning-grid" aria-label="Deadline and source verification tools">
        <DeadlinePlanner electionDate={electionDate} onElectionDateChange={setElectionDate} />
        <SourceVerifier
          sourceUrl={sourceUrl}
          rating={sourceRating}
          onSourceUrlChange={setSourceUrl}
        />
        <section className="api-path" aria-labelledby="api-path-heading">
          <h2 id="api-path-heading">Production Civic Info path</h2>
          <p>
            The browser never receives a real API key. A Cloud Run backend should store the key,
            validate locality input, call Google Civic Information API, and return only safe civic
            fields.
          </p>
          <code>{civicInfoUrl}</code>
        </section>
      </section>
    </main>
  )
}

export default App
