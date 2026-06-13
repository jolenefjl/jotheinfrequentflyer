# Jo the Infrequent Flyer

An editorial travel site for a full-time working mother who travels infrequently and makes every
trip count. The site combines honest reviews, practical details, and strongly opinionated advice
without requiring a magazine-scale publishing schedule.

Live site: [jotheinfrequentflyer.com](https://jotheinfrequentflyer.com)

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Sanity Studio embedded at `/studio`
- Vercel hosting and analytics
- Google Sheets and Apps Script newsletter capture, pending final Google deployment

## Services

- GitHub: `jolenefjl/jotheinfrequentflyer`
- Vercel project: `jotheinfrequentflyer`
- Sanity project: `sfes8wpi`
- Sanity dataset: `production`
- Production domain: `jotheinfrequentflyer.com`

## New Computer Setup

```powershell
git clone https://github.com/jolenefjl/jotheinfrequentflyer.git
cd jotheinfrequentflyer
npm install
Copy-Item .env.example .env.local
```

The public Sanity defaults are also present in code, but keeping `.env.local` makes setup explicit.
Sign into Vercel and Sanity when their CLIs request authentication.

Useful commands:

```powershell
npm run dev
npm run build
npm run lint
npx vercel link
```

The owner normally reviews changes after they are pushed and deployed to Vercel rather than using a
local preview.

## Environment Variables

See `.env.example`. Newsletter variables are server-only and must never use a `NEXT_PUBLIC_`
prefix. Production values belong in Vercel, not Git.

## Content Editing

Sanity Studio is available at:

```text
https://jotheinfrequentflyer.com/studio
```

Editorial schemas live in `src/sanity/schemaTypes`. Site content is fetched through
`src/lib/sanity-content.ts`. Rich text is rendered by `src/components/rich-text.tsx`.

Main content types include stay reviews, food reviews, experiences, kids content, travel tips, top
lists, city guides, destinations, general site pages, homepage controls, site chrome, and SEO
settings.

## Deployment

Pushing `main` to GitHub triggers the production Vercel deployment. Avoid also running a manual
Vercel deploy for the same commit, as that creates duplicate deployments.

## Context for Coding Agents

Read `AGENTS.md` first, then `PROJECT_CONTEXT.md`. Those files contain the accumulated design,
content, architecture, and workflow decisions for continuing this project safely.
