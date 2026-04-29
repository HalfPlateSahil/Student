import { useMemo, useState } from 'react'
import { Checklist } from './components/Checklist'
import { DecisionGuide } from './components/DecisionGuide'
import { GoogleActionHub } from './components/GoogleActionHub'
import { Hero } from './components/Hero'
import { ProfilePanel } from './components/ProfilePanel'
import { QuestionPanel } from './components/QuestionPanel'
import { ReadinessSummary } from './components/ReadinessSummary'
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
    {
      id: 'civic',
      label: 'Civic Info API',
      description: 'Developer-ready request shape for official election data.',
      href: civicInfoUrl,
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
    </main>
  )
}

export default App
