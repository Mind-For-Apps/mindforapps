# Changelog

## 2026-07-15 — Standalone `/templates` listing page

### Added
- `src/app/templates/page.tsx` + `TemplatesPageBrowser.tsx` — a full templates listing built from a screenshot the user provided: search box, sort dropdown (Most popular/Newest/Title A-Z/Title Z-A), and a "Filters" sidebar (Industry from `categories`, Platform Type/User Roles from the same fixed option sets already used in the admin Template form, Features Included from `template_feature_tags` with a "See all" expand, and Price Range buckets), all client-side over the same 36 public templates already used on the homepage. No new schema was needed — every filter facet already existed in the DB.
- Homepage `Templates` section now caps its grid to **4** templates (`TemplatesBrowser` gained an optional `limit` prop) with a "Show more" button linking to `/templates`, instead of showing all 36.
- `src/lib/templates.ts`: `getTemplateCards()` now also returns `platformType`, `userRoles`, `featureTags`, and `createdAt` (needed for the new filters/sort); added `getFeatureTags()`.

## 2026-07-15 — Shared FAQ table + standalone `/faq` page

### Added
- `supabase/migrations/0011_faqs.sql`: new shared `faqs` table (`question`, `answer`, `show_on_index`, `real_estate_sort_order`, `sort_order`) — one table feeding three different surfaces:
  - `/faq` (new standalone page): every row, in `sort_order`.
  - Homepage (new `FAQ.tsx` section, added after `Templates`): only rows with `show_on_index = true` (10 of the 37 real rows), plus a "View all FAQ's" link to `/faq`.
  - `/solutions/real-estate` **only**: rows where `real_estate_sort_order` is set (5 rows), ordered by that number — every other solution's page has no FAQ section at all, gated by checking `slug === "real-estate"` before fetching.
- `scripts/faqs-data.json` + `npm run seed:faqs` (`scripts/seed-faqs.ts`): seeds all 37 real FAQs from the client's export, upserting by question text.
- `src/components/sections/FAQAccordion.tsx`: promoted from a solutions-only static component (hardcoded 7 questions) to a shared, data-driven one (`items: Faq[]` prop) — now used by the homepage, `/faq`, and the solution detail page. The old per-page copy (`src/app/solutions/[slug]/FAQAccordion.tsx`) was deleted.
- `src/lib/faqs.ts`: `getAllFaqs()`, `getIndexFaqs()`, `getRealEstateFaqs()`.
- Admin: new `/admin/faqs` CRUD section (added to the dashboard nav) with a "Show on homepage" checkbox and a "Real Estate position" number field (blank = don't show there).
- The CSV's `nr for real estate` column only had values for the 5 rows meant for that one solution — everything else was blank, confirming this mechanism is Real-Estate-specific by design, not a general per-solution FAQ system (matches what the user asked for literally).

## 2026-07-15 — Real testimonials data

### Added
- `scripts/testimonials-data.json` + `npm run seed:testimonials` (`scripts/seed-testimonials.ts`): seeds the shared `testimonials` table from the client's real feedback export (5 real client quotes with photos re-uploaded to Storage), upserting by name so re-running is safe.
- Mapped the CSV's confusingly-named `Project Name` column to `testimonials.company` — it's actually the short descriptive tagline shown under the role on the card (e.g. "Climate fintech for decarbonization"), not a literal project/company name. The CSV had no `role` column; every real testimonial-giver was a "Founder" per the reference screenshots, so that's used as a static default (editable per-row in `/admin/testimonials` if any turn out to be something else).

## 2026-07-14 — Solution detail page (`/solutions/[slug]`)

### Added
- `src/app/solutions/[slug]/page.tsx` + colocated `StickyNav.tsx`, `FeaturesBrowser.tsx`, `TestimonialsCarousel.tsx`, `FAQAccordion.tsx`, `CalendlyWidget.tsx` — a long-form, one-page sales layout built from screenshots the user provided across several messages: Hero (with a unique sticky in-page nav — Top/Why us/Features/Process/Pricing/Contact — distinct from the global site Header, which only shows at the very top), the homepage's `TrustCarousel` reused as-is, "Who it's built for" audience cards, an image gallery, a "Building for clients?" white-label callout, a black Without/With MindForApps comparison, an interactive Feature Categories browser (`solution_feature_categories`/`solution_feature_labels`, previously seeded but never rendered anywhere), a results/stats block, a 3-step Process section, a Tools grid, a "What's Included" feature grid, a shared testimonials carousel, an FAQ accordion, Build/Grow track pricing, and a final CTA with a live **Calendly** embed (`https://calendly.com/jdranicher/45min`, via `next/script`).
- `supabase/migrations/0010_solution_detail_page.sql`: new `solution_included_features` child table (mirrors `case_study_key_features`'s shape) for the "What's Included" grid; `build_price_low`/`build_price_high`/`build_checklist` columns on `solutions` for the Pricing section's Build track; a new shared `testimonials` table (not tied to any one solution — the reference quotes are generic agency testimonials reused identically across every solution page, not industry-specific).
- `getSolutionBySlug()` added to `src/lib/solutions.ts`; new `src/lib/testimonials.ts`.
- Admin: `IncludedFeaturesRepeater.tsx` + Build-track pricing fields added to the Solutions form; new `/admin/testimonials` CRUD section (added to the dashboard nav).
- `public/images/logo-icon.svg`: an icon-only crop of `logo.svg` (just the interlocking-loop mark, no wordmark), extracted for the sticky in-page nav which shows a smaller mark than the full Header logo.

### Known simplifications (screenshots didn't fully resolve, or fidelity wasn't worth the cost)
- The reference screenshots for this page turned out to mix content from **at least two different solutions** (Service Booking's Hero/Process copy alongside Real Estate's Pricing checklist and Feature Categories, since Real Estate is the only solution with feature-category data seeded) — treated as a template to fill per-solution, not a single literal page to match pixel-for-pixel.
- **"What's Included" was a hand-positioned mind-map diagram in the reference** (a `Group 8900.png` asset was found showing Real Estate's version, with dotted connector lines to a central "Solution" node) — rebuilt as a responsive grid of cards instead, since a fixed absolute-position diagram doesn't adapt to a variable item count per solution or to mobile widths.
- **"Who it's built for" audience cards have no description field in the data** — `designed_for` (Bubble "list of texts") only ever held short titles ("Solo professionals", etc.), not the longer descriptions shown in the screenshot ("Coaches, therapists, tutors..."). Rendered title + a generic cycling icon only; the descriptions were never captured in any seed data.
- **Process steps, the "Numbers we've shipped" stats block, FAQ, and the Grow-track pricing card are static/hardcoded**, not per-solution DB content — their copy barely varies between reference screenshots of different solutions (Process interpolates the solution's `title` into one sentence; everything else is identical). Only the Build-track price/checklist and the Feature Categories are genuinely per-solution data.
- **`Contact` in the sticky nav and every in-page CTA link to the global Footer's `#start-your-project` form**, not a separate per-page contact mechanism.

## 2026-07-14 — Site-wide Footer with "Start Your Project" contact form

### Added
- `src/components/layout/Footer.tsx`: new global footer added to every public page (`/`, `/case-studies`, `/case-studies/[slug]`, `/solutions`), built from screenshots the user provided:
  - "Start Your Project" card: pick one of 4 stages (Exploring / Project Brief / Full Requirements / Full Designs), which reveals a budget picker ($3,000 / $6,000 / $9,000+ / Not sure yet), Name/Email, Project title, a message field, and multi-file upload.
  - Below it, a black nav footer: site links (Home/Case studies/Services/Templates/Solutions and Contact/About us/Plugins/FAQ/Blog), 5 social icons (LinkedIn/YouTube/Pinterest/Behance/Dribbble — hand-drawn inline SVGs, no real profile URLs yet), and "Start Your Project"/"Book a Consultation" buttons.
  - Two background images supplied by the user (`public/images/footer-top-wave.png`, `public/images/footer-form-bg.webp`) — the wave is only applied behind the light form card; recreating the exact bleed into the black nav section from the reference screenshots was skipped as a low-value pixel-perfect chase.
  - `public/images/logo-white.svg`: a white-fill copy of the header's `logo.svg`, created because that file's `fill="var(--fill-0, black)"` override pattern only works when the SVG is inlined — it does nothing when loaded through `next/image`'s `<img>` tag (which is how this codebase uses all its icon/logo SVGs), so a real white variant was the only way to put the logo on a dark background.
- `supabase/migrations/0009_project_inquiries.sql`: new `project_inquiries` table (public insert / authenticated-only read) plus a new **private** Storage bucket `project-inquiry-files` (public insert, authenticated-only read/delete) — private because attachments may contain client briefs/NDAs, unlike the public `case-study-media` bucket.
- `src/components/layout/inquiry-actions.ts`: `submitProjectInquiry` Server Action, called from the footer form.
- `/admin/inquiries`: new admin list page (added to the dashboard nav) showing every submission with mark read/unread, delete, and signed-URL links to any uploaded files (bucket is private, so admin reads use `createSignedUrls`, not public URLs).
- Wired the Hero section's pre-existing (previously non-functional) "Start Your Project" / "Book a Consultation" buttons to `#start-your-project`, since a real destination now exists.

### Known gaps
- **Requires a manual migration before it works**: run `0009_project_inquiries.sql` in the Supabase SQL Editor. Until then the form's own error handling kicks in cleanly (shows "Something went wrong", no crash) but nothing is actually saved.
- Social icons link to `#` (no real profile URLs given yet); "Book a Consultation" also currently just scrolls to the same form (no separate booking/calendar tool wired up).
- Footer nav links to `/services` and `/templates` still 404 (pre-existing gap, not introduced here).

## 2026-07-14 — "What Was Built" gets real per-item icons

### Added
- `supabase/migrations/0008_case_study_web_architecture.sql`: new `case_study_web_architecture` child table (same shape as `case_study_key_features`: `label` + `icon_url` + `sort_order`), replacing the old plain `web_architecture text[]` column on `case_studies` (dropped in the same migration).
- `scripts/web-architecture-data.json` + `npm run seed:web-architecture` (`scripts/seed-case-study-web-architecture.ts`): re-uploads the real per-item icons (from a user-provided Bubble CSV export) to Storage and seeds the new table for all 6 case studies, matched to the correct case study by exact title text (not row position — the CSV interleaves a few stale/iconless duplicate rows that were identified and skipped).
- Admin: new `WebArchitectureRepeater.tsx` (clone of `KeyFeaturesRepeater.tsx`) replacing the old plain-text `TextListRepeater` for this field, wired through `CaseStudyForm.tsx`/`actions.ts`/`[id]/page.tsx`/`new/page.tsx`.
- Public: `/case-studies/[slug]`'s "What Was Built" section now renders each item's real icon instead of cycling through generic placeholder icons from `public/images/icons/`.
- Redesigned the "Client Feedback" section to match the real reference design (screenshot provided by the user): a wavy blue/black gradient background (`public/images/case-study-detail/feedback-background.png`), a dark navy quote card with a left accent bar, a gray silhouette fallback avatar (`public/images/icons/profiles.svg`) when `client_photo_url` is empty, and a small attribution footer inside the card reusing the case study's own `main_image_url` thumbnail + `logo_url` wordmark + title — both fields existed on `CaseStudyDetail` already but weren't rendered anywhere on the page until now.

### Fixed
- **Site-wide bug**: `next.config.ts` never set `images.dangerouslyAllowSVG`, so Next's image optimizer silently rejected every remote `.svg` (`"image type is not allowed"`, 400) — this had been quietly breaking Tools icons, Key Features Delivered icons, and now Web Architecture icons ever since they were first added, and only became obvious once a whole section (this one) was built entirely out of SVG icons. Fixed by adding `dangerouslyAllowSVG: true` with the recommended `contentDispositionType`/`contentSecurityPolicy` pairing.
- Migration `0008` + `npm run seed:web-architecture` have now been run against the live database (see below — this was pending at the time this entry was first written).

### Known gaps
- None remaining for this feature — migration `0008` and the seed have both been run; `/case-studies/[slug]` works end-to-end.

## 2026-07-13 — Case study detail page

### Added
- `/case-studies/[slug]` detail page (`src/app/case-studies/[slug]/page.tsx` + colocated `BulletSection.tsx`/`HighlightText.tsx`), built from Figma screenshots plus a full saved copy of the live reference page the user provided partway through (`Assets/*.html`, gitignored) once it turned out the initial screenshots didn't cover every section: hero with tag pills, a black info bar (Services/Deliverables/Tools/Timeline/"Live website" link), header/progress image galleries, Problem & Context + "The challenge was", Project-based collaboration, Client Goal, Solution (blue-accent card), "What Was Built" (dark section using `web_architecture` with generic cycling icons), **Key Features Delivered** (the per-case-study `case_study_key_features` table — closes a long-standing gap, this data existed since the first seed but was never rendered anywhere), Platform & Tools Used, "Outcome & Impact" stat highlights (`text_1`–`text_6`, BBCode-parsed), a client testimonial (dark navy card), **Team Involvement** (the `team_involvement_types`/`case_study_team_involvement` lookup — another previously-unrendered table, discovered from the reference page), and Suitable For (bordered pill grid).
- `src/lib/parse-highlight.ts`: parses Bubble's `[b][size=4][color=...]...[/color][/size][/b]` stat-highlight pseudo-markup into plain/colored text segments (rendered as React nodes, not `dangerouslySetInnerHTML`).
- `getCaseStudyBySlug()` added to `src/lib/case-studies.ts`, fetching every rich field plus services/tools/key-features/team-involvement relations for one case study.
- `CaseStudyCard` now links to its detail page via a new "View Case Study" button (used by both the homepage slider and the `/case-studies` listing).
- 5 decorative illustration assets (Group/target/globe SVGs + a blue-target AVIF, supplied by the user) moved into `public/images/case-study-detail/` — purely cosmetic, reused identically across every case study's Challenge/Collaboration/Client Goal/Solution/Team-Involvement sections.

### Fixed
- Corrected section order and the testimonial/Suitable For styling to match the real reference page once found, after an initial pass designed them inline from incomplete screenshots (see `CLAUDE.md` Gotchas).

### Known gaps
- Solutions' equivalent stat-highlight fields (`text_0`–`text_8`) are still unrendered — no `/solutions/[slug]` page exists yet.

## 2026-07-13 — Solutions/Templates content, new homepage sections, admin CRUD

### Added
- `supabase/migrations/0003_extend_solutions.sql`: rich fields on `solutions` (images, designed_for, with/without MFA, text_0–text_8, SEO, etc.) plus a `solution_tools` junction table.
- `supabase/migrations/0004_solution_features.sql`: `solution_feature_categories` + `solution_feature_labels` (colored feature-chip groups), seeded for the `real-estate` solution.
- 5 real industry solutions seeded (Real Estate, EdTech, HealthTech, Service Booking, Marketplace) via `npm run seed:solutions`, linked to tools.
- Public `/solutions` listing page (`SolutionCard`) and a new edge-to-edge, autoplay + mouse-drag carousel (`SolutionsCarousel`) replacing the static 3-column grid on the homepage.
- `supabase/migrations/0005_categories.sql`: `categories` lookup table (8 rows: Real Estate, E-commerce, Booking, Marketplace, Rental, Education, Health & Wellness, Multi-purpose), seeded via `npm run seed:categories`.
- `supabase/migrations/0006_templates.sql`: `templates`, `template_categories`, `template_feature_tags`, `template_features`. 47 templates seeded via `npm run seed:templates` (36 public), each with re-uploaded images, category links, and feature-tag links.
- `supabase/migrations/0007_resolve_template_new_images.sql`: resolved the templates' `new_images` field (originally raw Bubble "New Images" refs) directly into real image URLs during seeding, instead of building a separate table for it — that Bubble type turned out to be just a plain image wrapper.
- New homepage **Services** section (`Services.tsx` + `ServicesSlider.tsx`) reading live from the `services` table, with an edge-to-edge peek carousel.
- New homepage **Add-ons** section (`AddOns.tsx`) — 4 static clickable blocks (Template Customization, Plugins Development, QA & Audit, Ongoing Support), each with a hover border. Destinations (`href="#"`) and the featured photo are placeholders pending real content from the user.
- New homepage **Templates** section (`Templates.tsx` + `TemplatesBrowser.tsx`) with real, working client-side category filtering against the 36 public templates.
- 16 real tool icons seeded via `npm run seed:tools` (5 new tools added: Zoom, Android, RevenueCat, Natively, Daily).
- Admin CRUD for **Solutions** (rebuilt form covering every new field, incl. a nested Feature Categories/Labels repeater) and **Templates** (full form: media, links, Platform-type/User-roles selects, Category/Feature-tag checkboxes).
- **Categories** CRUD added as a new section on the existing `/admin/reference` page.
- Thumbnail previews (40×40, first/main image or a gray placeholder) added to the Case Studies, Solutions, and Templates admin list pages.
- A way back to the site from the admin panel: the "MFA Admin" logo and a new "View site" link both go to `/`.

### Fixed
- **Data-corrupting bug**: seed scripts split Bubble "list" export fields on a bare `","`, but the real separator is `" , "` (space-comma-space) — list items containing their own comma (e.g. "Predictable, fixed pricing") were being split into two. This had already corrupted several live `text[]` columns (case studies' Client Goal / The challenge was / WEB architecture / Suitable For / Project-based collaboration; services' `whats_included`). Fixed the splitter in every seed script and re-ran them to repair the data.
- **Duplicate-row bug**: `seed-services-and-features.ts` used a blind `insert()` for `services`, so re-running it after the above fix created 4 duplicate rows — cleaned up, and the script now checks for an existing row by name first.
- A template slug (`mini-сrafters`) contained a look-alike Cyrillic "с" that Supabase Storage rejected as an "Invalid key" on image upload — fixed the slug and added a Storage-path sanitizer to `seed-templates.ts` as a safeguard.
- Case study card: the Tools icon row could overflow its card on the right edge (missing `flex-wrap`/`min-w-0`) — fixed.
- Header logo wasn't a link — now goes to `/` from anywhere on the site.

### Known gaps
- Key Features Delivered still not rendered anywhere on the public site.
- No `/case-studies/[slug]` or `/solutions/[slug]` detail pages yet (Solutions cards link to a `/solutions/[slug]` route that 404s).
- No `/templates` listing page yet, despite the header nav linking there.
- Add-ons section needs real link destinations and a real photo for Template Customization (both pending from the user).
- Stat-highlight `[b][size=4][color=...]` pseudo-markup (case studies `text_1`–`text_6`, solutions `text_0`–`text_8`) still isn't rendered anywhere publicly.
- Solution Feature Categories/Labels are only seeded for the `real-estate` solution.

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
