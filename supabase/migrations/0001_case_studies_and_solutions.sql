-- Case Studies, Solutions, and their reference/lookup tables.
-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Lookup tables (shared taxonomies, reused across case studies)
-- ---------------------------------------------------------------------------

create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table team_involvement_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Case studies
-- ---------------------------------------------------------------------------

create table case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  problem text,
  context text,
  solution text,
  deliverables text,
  timeline text,
  hours text,
  team_size text,
  website_url text,
  logo_url text,
  main_image_url text,
  client_name text,
  client_photo_url text,
  client_feedback text,
  client_goal text[] not null default '{}',
  the_challenge_was text[] not null default '{}',
  project_based_collaboration text[] not null default '{}',
  suitable_for text[] not null default '{}',
  web_architecture text[] not null default '{}',
  header_images text[] not null default '{}',
  progress_images text[] not null default '{}',
  text_1 text,
  text_2 text,
  text_3 text,
  text_4 text,
  text_5 text,
  text_6 text,
  text_features text,
  text_tools text,
  text_what_was_built text,
  seo_title text,
  seo_description text,
  seo_image_url text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table case_study_services (
  case_study_id uuid not null references case_studies (id) on delete cascade,
  service_id uuid not null references services (id) on delete cascade,
  primary key (case_study_id, service_id)
);

create table case_study_tools (
  case_study_id uuid not null references case_studies (id) on delete cascade,
  tool_id uuid not null references tools (id) on delete cascade,
  primary key (case_study_id, tool_id)
);

create table case_study_team_involvement (
  case_study_id uuid not null references case_studies (id) on delete cascade,
  team_involvement_type_id uuid not null references team_involvement_types (id) on delete cascade,
  primary key (case_study_id, team_involvement_type_id)
);

create table case_study_key_features (
  id uuid primary key default gen_random_uuid(),
  case_study_id uuid not null references case_studies (id) on delete cascade,
  label text not null,
  icon_url text,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- Solutions
-- ---------------------------------------------------------------------------

create table solutions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price_label text,
  is_estimate_link boolean not null default false,
  tags text[] not null default '{}',
  more_count int not null default 0,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------

create function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger case_studies_set_updated_at
  before update on case_studies
  for each row execute function set_updated_at();

create trigger solutions_set_updated_at
  before update on solutions
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table services enable row level security;
alter table tools enable row level security;
alter table team_involvement_types enable row level security;
alter table case_studies enable row level security;
alter table case_study_services enable row level security;
alter table case_study_tools enable row level security;
alter table case_study_team_involvement enable row level security;
alter table case_study_key_features enable row level security;
alter table solutions enable row level security;

-- Lookup tables: public read, authenticated write.
create policy "services public read" on services for select using (true);
create policy "services admin write" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "tools public read" on tools for select using (true);
create policy "tools admin write" on tools for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "team_involvement_types public read" on team_involvement_types for select using (true);
create policy "team_involvement_types admin write" on team_involvement_types for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Case studies: public read of published rows, authenticated can read/write everything.
create policy "case_studies public read" on case_studies for select using (is_published = true or auth.role() = 'authenticated');
create policy "case_studies admin write" on case_studies for insert with check (auth.role() = 'authenticated');
create policy "case_studies admin update" on case_studies for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "case_studies admin delete" on case_studies for delete using (auth.role() = 'authenticated');

-- Junction / child tables: public read (needed to render published case studies), authenticated write.
create policy "case_study_services public read" on case_study_services for select using (true);
create policy "case_study_services admin write" on case_study_services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "case_study_tools public read" on case_study_tools for select using (true);
create policy "case_study_tools admin write" on case_study_tools for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "case_study_team_involvement public read" on case_study_team_involvement for select using (true);
create policy "case_study_team_involvement admin write" on case_study_team_involvement for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "case_study_key_features public read" on case_study_key_features for select using (true);
create policy "case_study_key_features admin write" on case_study_key_features for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Solutions: same pattern as case studies.
create policy "solutions public read" on solutions for select using (is_published = true or auth.role() = 'authenticated');
create policy "solutions admin write" on solutions for insert with check (auth.role() = 'authenticated');
create policy "solutions admin update" on solutions for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "solutions admin delete" on solutions for delete using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Storage bucket for case study media
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('case-study-media', 'case-study-media', true)
on conflict (id) do nothing;

create policy "case-study-media public read"
  on storage.objects for select
  using (bucket_id = 'case-study-media');

create policy "case-study-media admin write"
  on storage.objects for insert
  with check (bucket_id = 'case-study-media' and auth.role() = 'authenticated');

create policy "case-study-media admin update"
  on storage.objects for update
  using (bucket_id = 'case-study-media' and auth.role() = 'authenticated')
  with check (bucket_id = 'case-study-media' and auth.role() = 'authenticated');

create policy "case-study-media admin delete"
  on storage.objects for delete
  using (bucket_id = 'case-study-media' and auth.role() = 'authenticated');
