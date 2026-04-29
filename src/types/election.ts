export type Jurisdiction = 'us' | 'india' | 'uk' | 'custom'

export type VoterStatus = 'new' | 'registered' | 'moved' | 'overseas'

export type ProcessStep = {
  title: string
  timing: string
  detail: string
  action: string
}

export type ChecklistItem = {
  id: string
  text: string
  helper: string
  urgent?: boolean
}

export type SourceLink = {
  label: string
  description: string
  href: string
}

export type GoogleAction = {
  id: string
  label: string
  description: string
  href: string
}

export type Question = {
  q: string
  a: string
}
