# Civic Pathfinder

Civic Pathfinder is an interactive election-process assistant that helps people understand voting timelines, registration steps, official sources, and practical next actions in a clear, accessible way.

The app is designed for users who may not know where to begin. Instead of presenting a wall of election information, it turns the process into a guided plan: choose a region, describe your voting situation, review the timeline, complete a checklist, and open trusted Google-powered tools when needed.

Live app: [https://civic-pathfinder.vercel.app](https://civic-pathfinder.vercel.app)

## Purpose

Election rules are often local, deadline-sensitive, and difficult to compare across sources. Civic Pathfinder helps users move safely from uncertainty to action by:

- Explaining the election journey in plain language.
- Highlighting the importance of official election authorities.
- Creating a personalized checklist without storing sensitive personal data.
- Giving users quick access to Google Maps, Google Calendar, and a Google Civic Information API integration path.
- Keeping the interface lightweight enough for diverse devices and network conditions.

## Features

- Region-aware guidance for the United States, India, the United Kingdom, and other regions.
- Voter-situation profiles for new voters, registered voters, recently moved voters, and overseas or away voters.
- Timeline map that breaks the election process into clear stages.
- Interactive checklist with progress tracking and priority markers.
- Readiness snapshot that summarizes completed actions.
- Plain-language Q&A for common election-process questions.
- Official-source cards tailored to the selected region.
- Google Maps action for nearby election offices or civic service locations.
- Google Calendar reminder link for deadline review.
- Google Civic Information API helper URL for future backend integration.
- Responsive, accessible interface with keyboard-focus states and semantic HTML.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Lucide React icons
- Vercel for deployment

The app is intentionally client-light and asset-light. It avoids checked-in heavy media so the complete GitHub repository can remain comfortably under 10 MB.

## Project Structure

```text
src/
  components/
    Checklist.tsx
    Hero.tsx
    ProfilePanel.tsx
    QuestionPanel.tsx
    ReadinessSummary.tsx
    Timeline.tsx
  data/
    electionGuide.ts
  lib/
    checklist.ts
    google.ts
  types/
    election.ts
  App.tsx
  App.css
  index.css
  main.tsx
```

### Key Files

- `src/data/electionGuide.ts` contains region labels, process timelines, official source links, and Q&A content.
- `src/lib/checklist.ts` builds the personalized checklist from the selected voter situation and region.
- `src/lib/google.ts` centralizes Google Maps, Calendar, and Civic Information helper URL generation.
- `src/components/ProfilePanel.tsx` contains the user profile controls and Google tool actions.
- `src/components/ReadinessSummary.tsx` summarizes user progress without storing personal data.

## Google Services

### Google Maps

The "Open nearby election offices" action builds a Google Maps search URL from the user's locality or address. It navigates the current tab so the action works reliably in embedded or constrained browsers.

### Google Calendar

The app creates a Google Calendar reminder link that users can open and save themselves. No calendar data is written automatically by the app.

### Google Civic Information API

The app includes a helper URL that demonstrates the shape of a Google Civic Information API request.

Do not place a real Google API key in client-side code. For production Civic Information API usage:

1. Create a small backend endpoint or serverless function.
2. Store `GOOGLE_CIVIC_INFO_API_KEY` as a server-side environment variable.
3. Call `https://www.googleapis.com/civicinfo/v2/voterinfo` from the backend.
4. Return only the fields needed by the UI, such as official offices, polling locations, contests, or election dates.
5. Add rate limiting and input validation before exposing the endpoint publicly.

## Privacy and Safety

Civic Pathfinder is built around a low-data approach:

- It does not require sign-in.
- It does not store addresses, locality searches, or checklist progress on a server.
- It does not collect government IDs, voter IDs, phone numbers, or other sensitive identifiers.
- It treats official election offices as the source of truth.
- It avoids making universal claims about deadlines because election rules vary by region and election type.

Users should always verify final deadlines, eligibility, documents, and polling locations with their official election authority.

## Getting Started

### Prerequisites

- Node.js 20 or newer recommended
- npm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The app will start on a local Vite development URL, usually:

```text
http://127.0.0.1:5173/
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run build
```

Runs TypeScript build checks and creates a production build in `dist/`.

```bash
npm run preview
```

Serves the production build locally for a final preview.

## Deployment

The app is configured for Vercel using `vercel.json`.

```bash
npx vercel --prod
```

Current production deployment:

[https://civic-pathfinder.vercel.app](https://civic-pathfinder.vercel.app)

Vercel settings:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Accessibility Notes

The interface uses:

- Semantic sections, headings, forms, buttons, and lists.
- Visible keyboard focus states.
- `aria-live` feedback for the Google Maps action.
- Descriptive labels for form controls.
- Sufficient layout spacing for mobile and desktop use.

Future accessibility improvements could include saved text-size preferences, translated content, and a full screen-reader audit with automated and manual testing.

## Maintaining Election Content

Election rules change often. When updating content:

- Prefer official election authority sources.
- Keep guidance general unless a rule is stable and jurisdiction-specific.
- Avoid hard-coding live deadlines unless there is a content update process.
- Keep action language practical and verifiable.
- Review `src/data/electionGuide.ts` first; most user-facing civic content lives there.

## Repository Size Strategy

The repository is kept small by:

- Avoiding checked-in photos, videos, and large generated assets.
- Using lightweight SVG icons and CSS.
- Loading the hero image remotely instead of storing a large bitmap in the repo.
- Keeping generated folders such as `node_modules`, `dist`, and `.vercel` out of version control.

## Validation Checklist

Before shipping changes, run:

```bash
npm run lint
npm run build
```

Recommended manual checks:

- Change each region and confirm the timeline and official sources update.
- Change each voter situation and confirm the checklist updates.
- Toggle checklist items and confirm the readiness percentage changes.
- Test the Google Maps action with and without a locality.
- Open the Google Calendar reminder link.
- Verify the layout on mobile and desktop widths.

## License

No license has been specified yet. Add a license before distributing or accepting external contributions.
