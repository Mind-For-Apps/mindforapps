@AGENTS.md

# Mind For Apps — Project Guide

Marketing site + admin CMS for a no-code/MVP development agency. Content (case studies, solutions, services) is editable through a password-protected admin panel, backed by Supabase. Repo: [Mind-For-Apps/mindforapps](https://github.com/Mind-For-Apps/mindforapps), deployed on Vercel (auto-deploys on push to `main`).

## Stack

- **Next.js 16** (App Router, Turbopack) — see `AGENTS.md`; this version has breaking changes vs. training data (e.g. `proxy.ts` replaces `middleware.ts`). Check `node_modules/next/dist/docs/` before assuming an API.
- **Tailwind CSS v4** — tokens live in `@theme` blocks inside `src/app/globals.css`, not `tailwind.config.js`.
- **Supabase** — Postgres (schema in `supabase/migrations/`), Auth (admin login), Storage (case study / service images). Project ref `rvsgqzidyzgohmokogfu`.

## Structure

- `src/components/sections/` — homepage sections (Hero, CaseStudies, CaseStudySlider, CaseStudyCard, Solutions, FeatureGrid, WithMindforapps, TrustCarousel)
- `src/components/layout/` — Header, MobileNav
- `src/components/admin/` — shared admin form widgets (ImageUploadField, MultiImageUploadField, TextListRepeater, CheckboxGroup, FormField)
- `src/app/admin/` — password-protected admin panel: `(dashboard)` route group holds the authed shell (Case Studies / Solutions / Reference Data CRUD), `login/` is public
- `src/app/case-studies/` — public case studies listing page
- `src/lib/supabase/` — `client.ts` (browser) / `server.ts` (SSR, cookie-based via `@supabase/ssr`)
- `src/lib/case-studies.ts` — shared query + mapping used by both the homepage slider and `/case-studies`
- `src/proxy.ts` — auth guard for `/admin/*` (Next 16 renamed `middleware.ts` → `proxy.ts`)
- `scripts/` — one-off data migration scripts, see below
- `public/images/` — static design assets pulled from Figma (logos, decorative icons, backgrounds). Real content images (case study photos, service pictures) live in Supabase Storage instead.

## Important decisions (and why)

- **Images upload straight to Supabase Storage**, not pasted URLs — user explicitly chose this over a simpler "paste a link" admin field, for a cleaner long-term workflow.
- **Services / Tools / Team Involvement are separate lookup tables** with their own mini-admin CRUD (`/admin/reference`), linked to case studies via junction tables — not inline text — because the source data (Bubble) reused the same ~4 services and ~10 tools across many case studies.
- **Key Features Delivered is a per-case-study child table**, not a shared lookup — each row only appears under one case study in the source data.
- Bubble fields typed "List of texts" (Client Goal, The challenge was, Suitable For, Project-based collaboration, Web Architecture) became plain `text[]` columns — no separate tables, since they're never reused across case studies.
- **Homepage sections read live from Supabase** (Server Components, no caching layer) rather than staying hardcoded — user wanted the admin panel to have immediate visible effect.
- **Single admin user**, created manually via Supabase Dashboard → Authentication → Users — no signup flow was built, since only one person needs access.
- Stat-highlight text fields (`text_1`…`text_6`, etc.) are stored **raw**, including their `[b][size=4][color=...]` Bubble-style pseudo-markup — parsing/rendering that markup was explicitly deferred, not lost.

## Coding rules observed in this repo

- Server Components by default; `"use client"` only where real interactivity is needed (repeaters, image upload, mobile nav, case study slider, login form).
- Admin mutations are Server Actions (`"use server"` files), bound with `.bind(null, id)` for update/delete rather than hidden form fields.
- Shared UI is extracted aggressively to avoid duplication — e.g. `CaseStudyCard` is used by both the homepage slider and `/case-studies`; `TextField`/`TextAreaField`/`FormSection` are shared across every admin form.
- No comments unless explaining a non-obvious constraint (see the "Gotchas" section below for examples of what actually warranted one).
- Images always go through `next/image`; remote patterns for the Supabase Storage domain are configured in `next.config.ts`.
- After any change, run `npm run build` to catch type/lint errors before calling something done — this project has caught several real bugs this way (e.g. Tailwind `@theme` circular reference, JSX escaped-quote parse error).

## Gotchas learned the hard way

- **Tailwind v4 `scale`**: uses the native CSS `scale` property, not `transform`. `-scale-x-100` works fine as a class, but verify via `getComputedStyle(el).scale`, not `.transform` (the latter stays `"none"`).
- **`@theme` vs `@theme inline`**: only use `inline` for referencing runtime-generated CSS vars (e.g. `next/font` variables). Plain color tokens belong in a normal `@theme { }` block. Putting them in `@theme inline` with a self-referencing `var(--x: var(--x))` creates a circular reference that silently breaks — the computed value becomes invalid/`none` with no error.
- **Next.js 16 proxy**: `middleware.ts` is deprecated; the file is now `proxy.ts`, exporting `proxy()` (or default export) + optional `config.matcher`.
- Figma-exported SVG assets can have mismatched geometry vs. their fill color (arrow-left/arrow-right were identical paths, different colors — the "right" arrow pointed left). Verify visually before trusting an asset's orientation.
- Preview browser tooling in this environment can get out of sync (stale scroll position, screenshot showing a different tab/state than `eval` reports). When a click "does nothing," verify with `element.dispatchEvent(new MouseEvent('click', {bubbles:true}))` or by calling the React prop's handler directly before assuming the code is broken.
- `create-next-app` refuses project names with capital letters — this is why the app was scaffolded into a temp lowercase subfolder and moved up, rather than directly into `D:\MFAsite`.

## Admin panel

- URL: `/admin` (redirects to `/admin/case-studies`), gated by Supabase Auth via `src/proxy.ts`.
- Admin users are created manually in the Supabase Dashboard → Authentication → Users (no signup flow exists on purpose).
- CRUD: Case Studies, Solutions, Reference Data (Services / Tools / Team Involvement — shared lookup tables linked to case studies via junction tables).
- Images upload directly to the `case-study-media` Storage bucket from the admin forms.

## Database

- Schema: `supabase/migrations/0001_case_studies_and_solutions.sql`, `0002_extend_services.sql`. These must be run manually in the Supabase SQL Editor — this environment only has the anon key, not a DB connection string or the ability to run DDL via the JS client.
- RLS: public `select` on `is_published = true` rows (lookup/junction tables are always publicly readable); all writes require the `authenticated` role.
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` live in `.env.local` (gitignored) and must also be set in Vercel's env vars for prod. `SUPABASE_SERVICE_ROLE_KEY` is only ever added temporarily for running a seed script, then removed — never used by the app itself, never committed.

## Data seed scripts (`scripts/`)

One-off migrations of the client's real content from their old Bubble.io app. Require `SUPABASE_SERVICE_ROLE_KEY` temporarily in `.env.local` — never commit it, remove it again after running:

- `npm run seed:case-studies` — imports the 6 real case studies and re-uploads their images to Storage.
- `npm run seed:services-features` — seeds the Services lookup table (with description/picture/tags) and per-case-study Key Features, and links both to case studies.

## Task status

**Done:** Figma landing page (Hero/Case Studies/Solutions/Feature Grid/With Mindforapps), Supabase schema + RLS + Storage, admin panel with full auth/CRUD for Case Studies + Solutions + Reference Data, `/case-studies` listing page, responsive header with mobile burger menu, homepage wired live to Supabase, 6 real case studies + 4 services + 50 key features seeded and linked.

**Remaining / known gaps** (see `CHANGELOG.md` for the authoritative, up-to-date list):
1. Key Features Delivered is seeded in the DB but not rendered anywhere on the site yet — needs a UI section added to `CaseStudyCard` (or a future case-study detail page).
2. Solutions table is empty — no industry cards (Real Estate, EdTech, etc.) published yet; add via `/admin/solutions`.
3. Tools lookup rows have no icon images (seeded name-only from case study text data) — can be uploaded via `/admin/reference`.
4. No full `/case-studies/[slug]` detail page yet — the rich fields (client feedback, header/progress image galleries, stat highlights, WEB architecture, etc.) are captured in the schema but have no public-facing template.
5. Bubble's `[b][size=4][color=...]` pseudo-markup in the stat-highlight text fields is stored raw and unparsed.
