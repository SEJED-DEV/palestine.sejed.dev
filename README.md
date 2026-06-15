# Palestine Educational Site

A multi-language educational awareness site about Palestine — built with Next.js 16.

**[palestine.sejed.dev](https://palestine.sejed.dev)** | **[GitHub](https://github.com/SEJED-DEV/palestine.sejed.dev)**

## Features

- 4 languages: English, Arabic, French, Hebrew (RTL support)
- Build-time content fetching from Wikipedia API + RSS feeds (Al Jazeera, HRW, Middle East Eye, +972 Magazine)
- Dark/light theme toggle
- Custom right-click context menu with keyboard navigation
- Separate News page (RSS) and References page (Wikipedia)
- Palestine timezone for all timestamps
- Fully static export (38 pages)

## Tech Stack

- **Next.js 16** — App Router, static generation
- **next-intl v4** — Internationalization
- **Framer Motion** — Animations
- **Tailwind CSS 4** — Utility-first styling
- **Sharp** — Image optimization

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

The `prebuild` script fetches Wikipedia content and RSS feeds automatically.

## License

MIT — see [LICENSE](LICENSE).
