-- Replaces the plain `web_architecture text[]` column on case_studies with a
-- proper per-case-study child table (same shape as case_study_key_features),
-- so "What Was Built" can show a real icon per item instead of a cycling
-- generic one. Run in the Supabase SQL Editor after 0007.

create table case_study_web_architecture (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null references case_studies (id) on delete cascade,
  label text not null,
  icon_url text,
  sort_order int not null default 0
);

alter table case_study_web_architecture enable row level security;

create policy "case_study_web_architecture public read" on case_study_web_architecture for select using (true);
create policy "case_study_web_architecture admin write" on case_study_web_architecture for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- The old column's data was already extracted into scripts/web-architecture-data.json
-- (keyed by slug) before writing this migration, so seeding doesn't depend on
-- the column below — run scripts/seed-case-study-web-architecture.ts any time
-- after this migration to populate the new table.
alter table case_studies drop column web_architecture;
