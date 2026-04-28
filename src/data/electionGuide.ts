import type { Jurisdiction, ProcessStep, Question, SourceLink, VoterStatus } from '../types/election'

export const jurisdictionLabels: Record<Jurisdiction, string> = {
  us: 'United States',
  india: 'India',
  uk: 'United Kingdom',
  custom: 'Other region',
}

export const statusLabels: Record<VoterStatus, string> = {
  new: 'New voter',
  registered: 'Already registered',
  moved: 'Moved recently',
  overseas: 'Overseas / away',
}

export const processByJurisdiction: Record<Jurisdiction, ProcessStep[]> = {
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

export const sourceLinks: Record<Jurisdiction, SourceLink[]> = {
  us: [
    {
      label: 'vote.gov',
      description: 'Registration and state election office routing',
      href: 'https://vote.gov/',
    },
    {
      label: 'Can I Vote',
      description: 'State-by-state polling place and ballot resources',
      href: 'https://www.nass.org/can-I-vote',
    },
  ],
  india: [
    {
      label: 'Voters service portal',
      description: 'Registration, corrections, roll search, and forms',
      href: 'https://voters.eci.gov.in/',
    },
    {
      label: 'Election Commission of India',
      description: 'Official schedules, notifications, and guidance',
      href: 'https://www.eci.gov.in/',
    },
  ],
  uk: [
    {
      label: 'Register to vote',
      description: 'Official UK registration service',
      href: 'https://www.gov.uk/register-to-vote',
    },
    {
      label: 'Electoral Commission',
      description: 'Voter ID, postal voting, and election guidance',
      href: 'https://www.electoralcommission.org.uk/i-am-a/voter',
    },
  ],
  custom: [
    {
      label: 'Search official sources',
      description: 'Look for government or election-authority domains first',
      href: 'https://www.google.com/search?q=official+election+authority',
    },
    {
      label: 'Google Maps',
      description: 'Find nearby election offices or civic service centers',
      href: 'https://www.google.com/maps/search/election+office',
    },
  ],
}

export const questions: Question[] = [
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
