# Civic Pathfinder

An interactive election-process assistant that helps users understand timelines, eligibility checks, voting methods, and next steps in plain language.

## What it does

- Lets users choose a region and voter situation.
- Shows a step-by-step election timeline.
- Builds a personalized checklist without storing personal data.
- Opens Google Maps searches for nearby election offices.
- Generates Google Calendar reminder links.
- Provides a Google Civic Information API helper URL for developers who add a backend/API key.

## Google services

This project intentionally does not place API keys in client code. For production:

1. Add a small backend endpoint that stores `GOOGLE_CIVIC_INFO_API_KEY` as a server-side secret.
2. Call `https://www.googleapis.com/civicinfo/v2/voterinfo` from that backend.
3. Return only the fields needed by the UI, such as polling locations, contests, and official sources.

Google Maps and Calendar links work without app secrets.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Repo size

The app uses code, CSS, icons, and a remote optimized hero image instead of checked-in media-heavy assets, keeping the GitHub repository well below 10 MB.
