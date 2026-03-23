# LoongClaw Website

Official website for [LoongClaw](https://github.com/loongclaw-ai/loongclaw) — built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — fast dev server and build tool
- **React Router** — client-side routing
- **i18next** — internationalization (EN / 中文)
- **Tailwind-free** — custom CSS with CSS variables
- **Lucide** — icon library

## Development

```bash
bun install
bun run dev      # build content + start dev server
bun run build    # production build
bun run preview  # preview production build
bun run lint     # lint
```

## Content

Documentation lives in `src/content/docs/` as Markdown files. Run `bun run build:content` to process them.

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/docs/*` | Documentation |
| `/community` | Community links |
| `/changelog` | Project changelog |

## i18n

Translations in `src/assets/locales/` — `en.json` and `zh-CN.json`.
