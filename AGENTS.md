<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from training
data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code and heed
deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Instructions

Before changing code:

1. Read `PROJECT_CONTEXT.md` and `README.md`.
2. Inspect `git status` and recent commits. Never discard user changes.
3. Treat Sanity as the source of truth for editorial content and site controls.
4. Preserve the established editorial design unless the user explicitly requests a redesign.

## Working Style

- The owner reviews changes on the live Vercel site, not through a local preview.
- Complete changes end to end: implementation, production build, commit, and push when requested.
- Use existing components, tokens, and content helpers before adding abstractions.
- Keep desktop and mobile behavior aligned. Always consider narrow mobile widths.
- Use `next/image` for editorial photography.
- Do not hardcode replacement editorial content when a Sanity field already exists.
- Do not expose secrets or server integration URLs through `NEXT_PUBLIC_` variables.

## Design Guardrails

- Editorial, restrained, and magazine-inspired, but manageable for one solo blogger.
- Background is clean off-white with charcoal text and restrained warm accents.
- Headings use the existing typography and should be consistent across pages.
- Avoid decorative cards, excessive rounding, gradients, and marketing-style hero layouts.
- Keep generous section spacing and clear separation between image and copy.
- Mobile navigation is a one-column burger menu. Search remains in the header.
- Newsletter sections remain hidden until the server integration is configured.

## Content and Routing

- Canonical stay URLs use `/stays/[slug]`, never `/journal/[slug]`.
- New published Sanity entries should populate their category listing automatically.
- Homepage placement is curated through the `homePage` Sanity singleton.
- Header, footer, navigation visibility, and category-filter visibility are controlled through
  the `siteChrome` Sanity singleton.
- Inline rich-text images preserve portrait/landscape orientation. Multi-image blocks use one
  centered collage caption, with optional `L:`/`R:` patterns when several captions are present.

## Verification

- Run `npm run build` for meaningful code changes.
- Existing lint failures may predate a task; do not silently broaden scope to unrelated cleanup.
- Never commit `.env.local`, `.vercel`, credentials, or generated build output.
