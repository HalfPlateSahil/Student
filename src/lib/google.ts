export function buildGoogleCalendarUrl(title: string, details: string) {
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

export function buildMapsSearch(address: string) {
  const query = address.trim() ? `election office near ${address.trim()}` : 'election office near me'
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

  return { query, url }
}

export function buildCivicInfoHelperUrl(address: string) {
  const params = new URLSearchParams({
    address,
    electionId: '2000',
    key: 'YOUR_GOOGLE_CIVIC_INFO_API_KEY',
  })

  return `https://www.googleapis.com/civicinfo/v2/voterinfo?${params.toString()}`
}
