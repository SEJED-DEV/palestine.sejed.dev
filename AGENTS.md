<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## OG Images

All pages use a single OG image: `public/og-image.png` (set in the root locale layout). No per-page OG images.

## Sources Page Refresh

The sources page has a client-side refresh mechanism:
- Every fetch includes a `_=${Date.now()}` cache buster to always hit the origin
- The API sets `Cache-Control: private, no-cache, no-store` and `Vary: *` to prevent all caching
- Each RSS feed fetch has an 8-second timeout (AbortSignal.timeout) to prevent hanging
- Clicking "Check" triggers `fetchNews(true)` — the `force` param only controls feedback text, not caching
- The displayed timestamp comes from the server's `fetchedAt` field in the API response
- Falls back to keeping existing data if the fetch fails

## PWA

- `public/manifest.json` — web app manifest (linked in root layout.js)
- `public/sw.js` — basic service worker (cache-first fallback)
- Browser `/sw.js` 404s should now resolve

## Search

- Search page at `/[locale]/search` with a JSON-LD `SearchAction` already in the root layout
- Searches across all content tabs (history, culture, activism, voices, boycott)
- Shows matched section headings and text snippets with nav links
- Highlighted left border for heading matches

## Components

### Wired in locale layout (`app/[locale]/layout.js`)
- `ScrollProgressBar` — thin red progress bar at top of page
- `BackToTop` — floating button in bottom-right corner
- `ShortcutsModal` — keyboard shortcut cheatsheet (users can press `?` or click to toggle)
- `PreFooter` — unified share buttons + related page cards in bottom section area
