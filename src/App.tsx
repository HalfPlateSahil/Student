import {
  CalendarPlus,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Languages,
  ListChecks,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Vote,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import './App.css'

type Jurisdiction = 'us' | 'india' | 'uk' | 'custom'
type VoterStatus = 'new' | 'registered' | 'moved' | 'overseas'

type ProcessStep = {
  title: string
  timing: string
  detail: string
  action: string
}

type ChecklistItem = {
  id: string
  text: string
  helper: string
  urgent?: boolean
}

const processByJurisdiction: Record<Jurisdiction, ProcessStep[]> = {
  us: [
    {
      title: 'Confirm eligibility',
      timing: 'Before registration deadlines',
      detail: 'Check age, citizenship, residency, and any state-specific rules.',
      action: 'Use your state election office or vote.gov as the source of truth.',
    },
    {
      title: 'Register or update details',
      timing: 'Often 2-4 weeks before Election Day',
      detail: 'Deadlines vary by state and may differ for online, mail, and in-person registration.',
      action: 'Update your address after a move, name change, or party preference change.',
    },
    {
      title: 'Choose how to vote',
      timing: 'When early voting and mail ballot windows open',
      detail: 'Options may include mail ballot, early in-person voting, or voting on Election Day.',
      action: 'Compare deadlines, travel needs, accessibility, and ID requirements.',
    },
    {
      title: 'Prepare materials',
      timing: 'One week before voting',
      detail: 'Review sample ballot, ID rules, polling place, ballot drop box, and assistance options.',
      action: 'Save reminders and directions before the final week.',
    },
    {
      title: 'Vote and track',
      timing: 'During the voting period',
      detail: 'Cast your ballot, keep any receipt/tracking number, and check ballot status where available.',
      action: 'Contact election officials quickly if your ballot has an issue.',
    },
  ],
  india: [
    {
      title: 'Verify voter registration',
      timing: 'Before the Electoral Roll closes',
      detail: 'Confirm that your name, age, address, and constituency appear correctly on the voter list.',
      action: 'Use the Election Commission services portal or local BLO support.',
    },
    {
      title: 'Apply or correct records',
      timing: 'During the roll revision window',
      detail: 'New voters, address changes, and corrections usually require official forms and identity proof.',
      action: 'Keep acknowledgement numbers for every application.',
    },
    {
      title: 'Track election notification',
      timing: 'After the schedule is announced',
      detail: 'Your phase, constituency date, polling station, and campaign silence period are announced officially.',
      action: 'Add the polling date to your calendar once confirmed.',
    },
    {
      title: 'Prepare voter slip and ID',
      timing: 'A few days before polling',
      detail: 'Carry an accepted photo ID and verify your polling station location.',
      action: 'Plan travel, accessibility support, and companion assistance if needed.',
    },
    {
      title: 'Vote at the booth',
      timing: 'Polling day',
      detail: 'Officials verify your identity, mark attendance, ink your finger, and direct you to the EVM/VVPAT.',
      action: 'Check the VVPAT slip briefly after pressing your choice.',
    },
  ],
  uk: [
    {
      title: 'Check registration',
      timing: 'Usually 12 working days before polling day',
      detail: 'Registration is tied to your address and must be updated after moving.',
      action: 'Use the official government registration service.',
    },
    {
      title: 'Choose voting method',
      timing: 'Before postal or proxy deadlines',
      detail: 'You may vote in person, by post, or by proxy if eligible.',
      action: 'Request postal or proxy voting early to avoid missed deadlines.',
    },
    {
      title: 'Prepare voter ID',
      timing: 'Before polling day',
      detail: 'Accepted photo ID is required for many UK elections.',
      action: 'Apply for a voter authority certificate if you need one.',
    },
    {
      title: 'Review candidates',
      timing: 'After nominations close',
      detail: 'Compare candidates, manifestos, local issues, and trusted fact checks.',
      action: 'Build a short personal decision note before voting.',
    },
    {
      title: 'Cast the ballot',
      timing: 'Polling day, usually 7:00-22:00',
      detail: 'Go to the assigned polling station or return your postal ballot on time.',
      action: 'Ask polling staff for help if any part is unclear.',
    },
  ],
  custom: [
    {
      title: 'Identify the election authority',
      timing: 'Start here',
      detail: 'Find the official body that publishes eligibility, registration, and result rules.',
      action: 'Use government domains and avoid unsourced social posts.',
    },
    {
      title: 'Capture key dates',
      timing: 'As soon as the calendar is released',
      detail: 'Record registration, correction, mail/proxy, early voting, polling, and result dates.',
      action: 'Add official dates to reminders and share them with household members.',
    },
    {
      title: 'Confirm voting method',
      timing: 'Before voting windows open',
      detail: 'Some places offer in-person, mail, proxy, overseas, accessible, or mobile voting options.',
      action: 'Pick the method that leaves the most buffer for your situation.',
    },
    {
      title: 'Prepare documents',
      timing: 'One week before voting',
      detail: 'Bring accepted ID, registration proof, appointment details, and accessibility requests if required.',
      action: 'Use only the official checklist for your jurisdiction.',
    },
    {
      title: 'Vote and verify',
      timing: 'Voting period',
      detail: 'Follow local ballot instructions and track ballot acceptance if your system supports it.',
      action: 'Report problems to the official helpline.',
    },
  ],
}

const questions = [
  {
    q: 'What should I do first?',
    a: 'Start by finding the official election authority for your address, then verify registration and deadlines. Everything else depends on that local source.',
  },
  {
    q: 'How do I avoid missing a deadline?',
    a: 'Create reminders for registration, corrections, mail/proxy requests, early voting, and polling day. Leave at least a one-week buffer where possible.',
  },
  {
    q: 'Can someone help me vote?',
    a: 'Most systems offer accessibility or language help, but the rules differ. Ask the election office before voting day and note the exact support allowed.',
  },
  {
    q: 'How do I know information is trustworthy?',
    a: 'Prefer official election websites, printed notices, and direct election-office contacts. Treat viral posts as leads to verify, not instructions to follow.',
  },
]

const statusLabels: Record<VoterStatus, string> = {
  new: 'New voter',
  registered: 'Already registered',
  moved: 'Moved recently',
  overseas: 'Overseas / away',
}

const jurisdictionLabels: Record<Jurisdiction, string> = {
  us: 'United States',
  india: 'India',
  uk: 'United Kingdom',
  custom: 'Other region',
}

function buildChecklist(status: VoterStatus, jurisdiction: Jurisdiction): ChecklistItem[] {
  const base: ChecklistItem[] = [
    {
      id: 'source',
      text: 'Find the official election authority for your voting address',
      helper: 'This prevents outdated or misleading guidance from creeping in.',
      urgent: true,
    },
    {
      id: 'dates',
      text: 'Write down registration, ballot request, early voting, and polling dates',
      helper: 'Dates change by election type and locality.',
    },
    {
      id: 'method',
      text: 'Choose a voting method with enough time buffer',
      helper: 'Mail, early, proxy, overseas, and in-person routes can have separate rules.',
    },
    {
      id: 'docs',
      text: 'Confirm required ID, forms, accessibility, and language support',
      helper: 'Prepare documents before the final week.',
    },
  ]

  if (status === 'new') {
    base.splice(1, 0, {
      id: 'register',
      text: 'Register as soon as your eligibility is confirmed',
      helper: 'New registration is the step most likely to block voting if missed.',
      urgent: true,
    })
  }

  if (status === 'moved') {
    base.splice(1, 0, {
      id: 'address',
      text: 'Update your address and polling assignment',
      helper: 'Moving can change constituency, ballot style, and polling place.',
      urgent: true,
    })
  }

  if (status === 'overseas') {
    base.splice(1, 0, {
      id: 'remote',
      text: 'Check overseas, absentee, postal, or proxy voting rules',
      helper: 'Remote voting often has earlier deadlines and document requirements.',
      urgent: true,
    })
  }

  if (jurisdiction === 'india') {
    base.push({
      id: 'roll',
      text: 'Verify your name on the electoral roll before polling day',
      helper: 'A voter slip helps, but the roll entry is what matters.',
    })
  }

  if (jurisdiction === 'us') {
    base.push({
      id: 'track',
      text: 'Look for ballot tracking if you vote by mail',
      helper: 'Many states let you confirm whether a mailed ballot was accepted.',
    })
  }

  return base
}

function googleCalendarUrl(title: string, details: string) {
  const now = new Date()
  const start = new Date(now)
  start.setDate(start.getDate() + 7)
  start.setHours(9, 0, 0, 0)
  const end = new Date(start)
  end.setHours(9, 30, 0, 0)
  const format = (date: Date) => date.toISOString().replace(/[-:]|\.\d{3}/g, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${format(start)}/${format(end)}`,
    details,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function App() {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('us')
  const [status, setStatus] = useState<VoterStatus>('new')
  const [searchAddress, setSearchAddress] = useState('')
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [mapStatus, setMapStatus] = useState('')

  const steps = processByJurisdiction[jurisdiction]
  const checklist = useMemo(() => buildChecklist(status, jurisdiction), [status, jurisdiction])
  const doneCount = checklist.filter((item) => completed[item.id]).length
  const progress = Math.round((doneCount / checklist.length) * 100)
  const mapSearchLabel = searchAddress.trim()
    ? `election office near ${searchAddress.trim()}`
    : 'election office near me'
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapSearchLabel,
  )}`
  const civicInfoUrl = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(
    searchAddress,
  )}&electionId=2000&key=YOUR_GOOGLE_CIVIC_INFO_API_KEY`
  const openElectionOffices = () => {
    setMapStatus(`Opening Google Maps for "${mapSearchLabel}"...`)
    window.location.assign(mapUrl)
  }

  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero__content">
          <p className="eyebrow">
            <Sparkles aria-hidden="true" size={18} /> Civic pathfinder
          </p>
          <h1 id="page-title">Understand the election process one step at a time.</h1>
          <p className="hero__copy">
            A calm, interactive assistant for timelines, eligibility, voting methods, reminders,
            and trustworthy next actions.
          </p>
          <div className="hero__actions" aria-label="Primary actions">
            <a className="button button--primary" href="#assistant">
              Start guide <ChevronRight aria-hidden="true" size={18} />
            </a>
            <a
              className="button button--ghost"
              href={googleCalendarUrl(
                'Review election deadlines',
                'Check registration, ballot, early voting, and polling dates from your official election authority.',
              )}
              target="_blank"
              rel="noreferrer"
            >
              <CalendarPlus aria-hidden="true" size={18} /> Add reminder
            </a>
          </div>
        </div>
        <div className="hero__panel" aria-label="Election journey overview">
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

      <section className="assistant-grid" id="assistant">
        <aside className="control-panel" aria-labelledby="profile-heading">
          <div className="panel-heading">
            <Vote aria-hidden="true" size={22} />
            <div>
              <h2 id="profile-heading">Voter profile</h2>
              <p>Personalize the guidance without storing personal data.</p>
            </div>
          </div>

          <label htmlFor="jurisdiction">Election region</label>
          <select
            id="jurisdiction"
            value={jurisdiction}
            onChange={(event) => setJurisdiction(event.target.value as Jurisdiction)}
          >
            {Object.entries(jurisdictionLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <label htmlFor="status">Current situation</label>
          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as VoterStatus)}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <label htmlFor="address">Address or locality</label>
          <div className="search-box">
            <Search aria-hidden="true" size={18} />
            <input
              id="address"
              type="search"
              value={searchAddress}
              onChange={(event) => setSearchAddress(event.target.value)}
              placeholder="City, ZIP, district, or constituency"
              autoComplete="street-address"
            />
          </div>

          <div className="google-tools">
            <button
              className="tool-link"
              type="button"
              onClick={openElectionOffices}
              aria-describedby="maps-helper"
            >
              <MapPin aria-hidden="true" size={18} /> Open nearby election offices
            </button>
            <p className="helper-text" id="maps-helper" aria-live="polite">
              {mapStatus || 'Opens Google Maps in this tab using your address or locality.'}
            </p>
            <details>
              <summary>Google Civic Info API helper</summary>
              <code>{civicInfoUrl}</code>
            </details>
          </div>
        </aside>

        <section className="timeline" aria-labelledby="timeline-heading">
          <div className="section-title">
            <Clock3 aria-hidden="true" size={22} />
            <div>
              <h2 id="timeline-heading">Timeline map</h2>
              <p>{jurisdictionLabels[jurisdiction]} process overview</p>
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
      </section>

      <section className="workbench" aria-label="Interactive assistant tools">
        <div className="checklist">
          <div className="section-title">
            <ListChecks aria-hidden="true" size={22} />
            <div>
              <h2>Your action checklist</h2>
              <p>{progress}% complete</p>
            </div>
          </div>
          <div className="progress" aria-label={`${progress}% complete`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          {checklist.map((item) => (
            <label className="check-item" key={item.id}>
              <input
                type="checkbox"
                checked={Boolean(completed[item.id])}
                onChange={() =>
                  setCompleted((current) => ({ ...current, [item.id]: !current[item.id] }))
                }
              />
              <span>
                <strong>
                  {item.text}
                  {item.urgent ? <em>Priority</em> : null}
                </strong>
                <small>{item.helper}</small>
              </span>
            </label>
          ))}
        </div>

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
                onClick={() => setActiveQuestion(index)}
              >
                {item.q}
              </button>
            ))}
          </div>
          <article className="answer-card">
            <ShieldCheck aria-hidden="true" size={28} />
            <h3>{questions[activeQuestion].q}</h3>
            <p>{questions[activeQuestion].a}</p>
          </article>
        </div>

        <div className="trust-card">
          <CheckCircle2 aria-hidden="true" size={28} />
          <h2>Built for safer civic guidance</h2>
          <p>
            The app avoids collecting sensitive identifiers, keeps official sources visible, and
            treats deadlines as locally verified facts instead of universal assumptions.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
