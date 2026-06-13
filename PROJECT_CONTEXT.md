# Project Context

Last updated: June 13, 2026

## Product

**Jo the Infrequent Flyer** is a personal travel publication by Jo. Jo is a mother with a full-time
job, so she does not travel constantly. The editorial promise is that limited holiday time makes
honest details, strong opinions, and carefully chosen experiences more valuable.

The voice is warm, candid, funny, specific, and occasionally emphatic. It should sound like an
experienced friend telling you what was genuinely worth the time and money, not a tourism board or
generic luxury publication.

## Visual Direction

References included Suitcase, Salt in Our Hair, and Along Dusty Roads. The result is a restrained
editorial layout rather than a dense magazine homepage.

Key decisions:

- Clean off-white background and charcoal typography.
- Strong editorial grids and thin rules.
- Restrained accent color.
- Consistent display typography across homepage and article pages.
- Generous vertical whitespace between major sections.
- Square controls rather than soft rounded cards.
- Photography carries the page; avoid decorative illustration and gradients.
- Mobile must not require horizontal navigation scrolling.
- The mobile menu is a conventional three-line burger and opens as a one-column list.

## Current Architecture

- Framework: Next.js 16.2.4 App Router.
- CMS: Sanity project `sfes8wpi`, dataset `production`.
- Studio: embedded at `/studio`.
- Hosting: Vercel project `jotheinfrequentflyer`.
- Repository: `https://github.com/jolenefjl/jotheinfrequentflyer`.
- Domain: `https://jotheinfrequentflyer.com`.
- Analytics: `@vercel/analytics`.

Sanity is the source of truth. Some fallback/mock data remains in `src/lib`, but published Sanity
documents should replace fallback content whenever matching content exists.

Important files:

- `src/lib/sanity-content.ts`: Sanity queries and normalization.
- `src/lib/editorial-data.ts`: editorial fallback data and shared types.
- `src/lib/metadata.ts`: page metadata helpers.
- `src/components/rich-text.tsx`: Portable Text and image-layout renderer.
- `src/components/site-header.tsx`: desktop/mobile header.
- `src/components/mobile-menu.tsx`: mobile navigation.
- `src/components/site-footer.tsx`: Sanity-controlled footer.
- `src/app/page.tsx`: homepage composition.
- `src/app/stays/[slug]/page.tsx`: stay review template.
- `src/sanity/schemaTypes`: all Sanity schemas.

## Sanity Controls

The homepage is curated through a homepage singleton. Individual homepage sections have visibility
controls so Jo can hide sections that require more content, including the field map and newsletter.

Header and footer content are managed through the site-chrome singleton. Category filter bars are
implemented but hidden by default until there is enough content to make them useful.

All editorial schemas support tags. Stay reviews additionally support:

- Place/city/country classification.
- Stay types such as five-star, midrange, resort, or Airbnb.
- Website, price, good-for, best-time, and avoid details.
- Loved and less-so lists.
- Five custom scores.
- Disclosure.

The five stay scores are:

1. Did My Wallet Cry? - value for money.
2. The Breakfast Test - because a bad breakfast ruins everything.
3. Gram-Worthy? - whether it is as photogenic as promised.
4. The Welcome Factor - whether service lived up to expectations.
5. Worth My Precious Days Off - the final infrequent-traveller question.

The displayed star score is the average of these criteria and includes the numeric total out of 5.

## Routing and Publishing

Canonical category routes include `/stays`, `/food`, `/experiences`, `/kids`, `/city-guides`,
`/places`, and `/travel-tips`.

Stay reviews use `/stays/[slug]`. Do not link stay reviews through `/journal`.

Publishing a new Sanity review should automatically add it to its category page. Homepage placement
is intentionally curated separately in the homepage document.

## Stay Review Layout

The stay-review top fold contains category, country, and month/year above the title, followed by the
calculated stars and score. Reading time is intentionally omitted.

The article body includes:

- Hero image and collage-capable rich text.
- Useful information sidebar on desktop.
- No "On this page" navigation on mobile.
- Loved and Less So after the body copy, aligned to the body width.
- Score breakdown after Loved and Less So, including criterion subtitles.
- Smaller disclosure text, aligned to the body width.

Avoid stray score labels around images and avoid doubled separator lines.

## Newsletter Status

The secure newsletter implementation exists but is not active until Google Apps Script is deployed
and two Vercel environment variables are configured.

The form collects first name, email, explicit consent, locale, and a honeypot spam field. The server
validates same-origin requests and forwards signups to Apps Script. Apps Script writes to the
private Sheet with ID `1e_vPteYJNGBpSFwS-KsqVIllVFgWPJ8s3tHy4VVI5Go`, prevents duplicates, and
emails `jolene.fjl@gmail.com`.

Setup files:

- `docs/google-sheets-newsletter.gs`
- `docs/newsletter-setup.md`

Required Vercel variables:

- `GOOGLE_APPS_SCRIPT_NEWSLETTER_URL`
- `NEWSLETTER_SIGNUP_SECRET`

Until both exist, newsletter forms stay hidden. The Apps Script `setup()` function generates the
secret; Jo does not need to invent one.

## SEO and Sharing

Articles should use their primary/cover image as the Open Graph and social-sharing image unless an
explicit page-level social image is supplied. Site-level sharing uses Sanity site settings and SEO
defaults.

## Known Workflow Preferences

- Jo prefers to see updates on the live Vercel deployment.
- Push one GitHub commit and allow the Git integration to deploy it. Do not also manually deploy the
  same commit.
- Do not start a local development server unless Jo asks.
- Before broad design changes, compare desktop and mobile behavior.
- Keep the site manageable for a solo publisher; visibility controls are preferable to empty
  sections.

## Recovery After Reformatting

1. Clone the GitHub repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Run `npm run build`.
5. Run `npx vercel link` and select the existing `jotheinfrequentflyer` project if CLI access is
   needed.
6. Open `/studio` and sign into the existing Sanity project.
7. Ask Codex to read `AGENTS.md`, `PROJECT_CONTEXT.md`, `README.md`, and recent Git history before
   making changes.

Do not restore `.vercel`, `.next`, or `node_modules` from backup. They are generated or relinked.
