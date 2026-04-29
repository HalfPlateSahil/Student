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

export function buildGoogleSearchUrl(address: string, sourceHint = 'official election authority') {
  const place = address.trim() || 'my area'
  const params = new URLSearchParams({
    q: `${sourceHint} ${place}`,
  })

  return `https://www.google.com/search?${params.toString()}`
}

export function buildGoogleTranslateUrl(text: string) {
  const params = new URLSearchParams({
    sl: 'auto',
    tl: 'hi',
    text,
    op: 'translate',
  })

  return `https://translate.google.com/?${params.toString()}`
}

export function buildYouTubeSearchUrl(address: string) {
  const place = address.trim() || 'voter education'
  const params = new URLSearchParams({
    search_query: `official voter education ${place}`,
  })

  return `https://www.youtube.com/results?${params.toString()}`
}

export function buildGmailComposeUrl(subject: string, body: string) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    su: subject,
    body,
  })

  return `https://mail.google.com/mail/?${params.toString()}`
}

export function buildGoogleSheetsCsvDataUrl(rows: string[][]) {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => {
          const escaped = cell.replaceAll('"', '""')
          return `"${escaped}"`
        })
        .join(','),
    )
    .join('\n')

  return `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`
}
