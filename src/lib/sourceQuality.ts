export type SourceRating = {
  label: string
  tone: 'strong' | 'medium' | 'weak'
  guidance: string
}

const officialPatterns = [/\.gov\b/i, /\.gov\.in\b/i, /\.gov\.uk\b/i, /eci\.gov\.in/i, /vote\.gov/i]

export function rateElectionSource(rawUrl: string): SourceRating {
  const value = rawUrl.trim()

  if (!value) {
    return {
      label: 'Waiting for a source',
      tone: 'medium',
      guidance: 'Paste an election information link to check whether it looks like an official source.',
    }
  }

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`)
    const hostname = url.hostname.replace(/^www\./, '')

    if (officialPatterns.some((pattern) => pattern.test(hostname))) {
      return {
        label: 'Likely official',
        tone: 'strong',
        guidance: `${hostname} looks like an official election or government domain. Still confirm the page date and jurisdiction.`,
      }
    }

    if (hostname.includes('google.com') || hostname.includes('youtube.com')) {
      return {
        label: 'Discovery source',
        tone: 'medium',
        guidance: 'Use this to discover information, then verify any instruction on an official election authority website.',
      }
    }

    return {
      label: 'Needs verification',
      tone: 'weak',
      guidance: `${hostname} may be useful context, but do not treat it as final voting guidance without official confirmation.`,
    }
  } catch {
    return {
      label: 'Invalid link',
      tone: 'weak',
      guidance: 'Enter a complete website address or domain name.',
    }
  }
}
