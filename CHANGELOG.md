# Changelog

## 2026-07-13 — Admin panel + Services/Key Features data

### Added
- `services` table extended with `description`, `picture_url`, `tags`, `whats_included` to match the real Bubble source data (`supabase/migrations/0002_extend_services.sql`).
- Seed script `scripts/seed-services-and-features.ts` (`npm run seed:services-features`): seeds 4 real services (with icons/pictures) and 50 per-case-study "Key Features Delivered" rows, links both to the 6 case studies.

### Changed
- Homepage and `/case-studies` "Services" field now shows real service names instead of placeholder text.

### Known gaps
- Key Features Delivered are stored per case study but not yet rendered anywhere on the site.
- Solutions table is empty — no industry cards published yet (needs entries via `/admin/solutions`).
- Tools lookup entries have no icon images (seeded name-only from case study data; icons can be added via `/admin/reference`).

## 2026-07-13 — Admin panel + Supabase-backed content

### Added
- Password-protected admin panel (`/admin`) using Supabase Auth: full CRUD for Case Studies and Solutions, plus a Reference Data section for the shared Services / Tools / Team Involvement lookup tables.
- Public case studies listing page (`/case-studies`) showing all published case studies stacked vertically.
- Case studies slider (prev/next arrows) on the homepage, backed by all published case studies instead of a single hardcoded one.
- Responsive header with a mobile burger menu (below 1024px) and scaling nav font sizes (1024–1280px) to fix overflow.
- Data migration scripts (`scripts/seed-case-studies.ts`) importing the client's 6 real case studies, including re-uploading all images to Supabase Storage.
- `supabase/migrations/0001_case_studies_and_solutions.sql`: full schema (case_studies, solutions, services, tools, team_involvement_types, junction tables, RLS policies, `case-study-media` Storage bucket).

### Changed
- Homepage `CaseStudies` and `Solutions` sections converted to async Server Components reading live from Supabase instead of hardcoded content.
- Hero headline/subtext/CTA copy and header nav links updated to match the latest Figma design.

## 2026-07-11 — Landing page from Figma

### Added
- Initial Next.js 16 + Tailwind v4 project scaffold, deployed to Vercel via GitHub.
- Landing page sections built from the Figma design: Header, Hero (with auto-scrolling trust-badge carousel), Case Studies, Solutions, Feature Grid (with center "Solution" highlight), With Mindforapps.
- Supabase client setup (`src/lib/supabase/client.ts`, `server.ts`) — not yet wired to any UI at this point.
