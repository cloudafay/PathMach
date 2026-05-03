# PathMatch

Frontend-only PathMatch app prepared for GitHub Pages.

## GitHub Pages

The deploy-ready static site is in `docs/`.

Recommended GitHub Pages setting:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`

Alternative:

- Source: `GitHub Actions`
- The workflow at `.github/workflows/deploy-pages.yml` deploys `docs/`.

## Local Entry Points

- Active deploy version: `docs/index.html`
- Development copy: `stitch-pathmatch/live/index.html`
- Original Stitch export browser: `stitch-pathmatch/index.html`

## Demo Accounts

- Student: `demo@pathmatch.app` / `demo123`
- Company: `company@pathmatch.app` / `demo123`

## Notes

This version does not require a backend. User data is stored in the visitor's browser through `localStorage`.
