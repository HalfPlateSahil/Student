# Civic Pathfinder

Civic Pathfinder is a modern election-process assistant that helps users turn confusing civic information into a clear, personal voting plan. It guides people through registration, deadlines, voting methods, official sources, local office discovery, reminders, and safe next actions without collecting sensitive voter data.

Live Vercel deployment: [https://civic-pathfinder.vercel.app](https://civic-pathfinder.vercel.app)

## What Makes It Useful

Election rules are local, time-sensitive, and easy to misunderstand. Civic Pathfinder solves that by giving users a structured civic workflow:

- Choose a voting region and situation.
- Understand the election journey through a step-by-step timeline.
- Build a personalized checklist.
- Track readiness progress.
- Open official sources and Google-powered tools.
- Export a plan for Google Sheets.
- Share a plan through Gmail.
- Translate checklist guidance with Google Translate.
- Search official voter education videos on YouTube.
- Prepare for a future Google Civic Information API backend.

The app keeps final authority where it belongs: official election offices and verified government services.

## Google Services Integrated

Civic Pathfinder uses Google services in a safe, credential-conscious way:

- **Google Maps**: opens nearby election offices or civic service centers based on the user's locality.
- **Google Calendar**: creates a user-controlled reminder for reviewing election deadlines.
- **Google Search**: builds official-source searches for local election authorities.
- **Google Translate**: opens checklist text in Google Translate for language support.
- **YouTube**: searches official voter education content.
- **Gmail**: creates a shareable election-plan draft.
- **Google Sheets**: exports the user's checklist as a CSV that opens cleanly in Sheets.
- **Google Civic Information API**: provides a developer-ready request shape without exposing a real API key in the browser.
- **Google Cloud Run**: the project includes a production container configuration for Cloud Run hosting.

## Privacy and Safety

The app follows a low-data civic design:

- No sign-in required.
- No server-side storage of address, locality, or checklist progress.
- No collection of voter IDs, government IDs, phone numbers, or financial information.
- No client-side Google API key exposure.
- No universal deadline claims; users are guided to verify final details with official authorities.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Lucide React icons
- Vercel deployment
- Cloud Run-ready Docker and Cloud Build configuration

## Project Structure

```text
src/
  components/
    Checklist.tsx
    DecisionGuide.tsx
    GoogleActionHub.tsx
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

## Local Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Cloud Run Deployment

This repository includes:

- `Dockerfile`
- `nginx.conf.template`
- `.dockerignore`
- `cloudbuild.yaml`

The container builds the Vite app and serves the static production output through Nginx on Cloud Run's `$PORT`.

### Deploy From Source

```bash
gcloud run deploy civic-pathfinder \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```

### Deploy With Cloud Build

```bash
gcloud builds submit --config cloudbuild.yaml
```

If this is the first deployment in a Google Cloud project, make sure these APIs are enabled:

- Cloud Run API
- Cloud Build API
- Artifact Registry or Container Registry support

## Production Notes

For a real Google Civic Information API integration:

1. Add a small backend endpoint or serverless route.
2. Store `GOOGLE_CIVIC_INFO_API_KEY` as a server-side secret.
3. Validate and rate-limit address input.
4. Call `https://www.googleapis.com/civicinfo/v2/voterinfo` from the backend.
5. Return only the civic fields the UI needs.

Do not commit API keys or service-account files.

## Repository Size Strategy

The repository is kept small by:

- Avoiding checked-in large images or videos.
- Using lightweight SVG icons and CSS.
- Loading the hero image remotely.
- Excluding `node_modules`, `dist`, `.vercel`, and build artifacts.

## Manual QA Checklist

- Change each region and confirm timeline/source updates.
- Change each voter situation and confirm checklist updates.
- Toggle checklist items and confirm readiness progress changes.
- Test Google Maps with and without a locality.
- Open Calendar, Search, Translate, YouTube, Gmail, Civic Info, and CSV export actions.
- Verify mobile and desktop layouts.
- Run `npm run lint` and `npm run build`.

## License

No license has been specified yet. Add a license before distributing or accepting external contributions.
