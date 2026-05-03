# PathMatch Stitch Export

Pulled from Google Stitch project `projects/3730425909653906707`.

## Contents

- `index.html`: local screen browser with preview iframe.
- `screens/`: exported standalone HTML files from Stitch.
- `screenshots/`: exported screen thumbnails/screenshots.
- `metadata.json`: project and screen source metadata.

## Open Locally

Open `index.html` in a browser. The exported screens use external Tailwind CDN and Google Fonts, so an internet connection is useful for exact rendering.

## Development Notes

These files are the raw Stitch export. The next practical step is to turn the screens into a maintainable app structure, for example a Vite/React project with shared layout, routes, components, and design tokens.
## Live Static App

The deploy-ready frontend-only app is in `live/`.

Open `live/index.html` for the active version. It includes routing, demo auth, applications, roadmap, messaging, profile edits, and company job management with `localStorage` persistence.

