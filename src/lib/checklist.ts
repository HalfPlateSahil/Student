import type { ChecklistItem, Jurisdiction, VoterStatus } from '../types/election'

export function buildChecklist(status: VoterStatus, jurisdiction: Jurisdiction): ChecklistItem[] {
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
