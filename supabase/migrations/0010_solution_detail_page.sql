-- Adds the remaining pieces needed for the /solutions/[slug] detail page:
-- per-solution "What's Included" feature bubbles (mirrors
-- case_study_key_features), per-solution Build-track pricing, and a shared
-- testimonials pool (reused identically across every solution page — the
-- reference quotes are generic agency testimonials, not industry-specific).
-- Run in the Supabase SQL Editor after 0009.

create table solution_included_features (
  id uuid primary key default gen_random_uuid(),
  solution_id uuid not null references solutions (id) on delete cascade,
  icon_url text,
  title text not null,
  subtitle text,
  tags text[] not null default '{}',
  sort_order int not null default 0
);

alter table solution_included_features enable row level security;

create policy "solution_included_features public read" on solution_included_features for select using (true);
create policy "solution_included_features admin write" on solution_included_features for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table solutions
  add column if not exists build_price_low int,
  add column if not exists build_price_high int,
  add column if not exists build_checklist text[] not null default '{}';

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  photo_url text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "testimonials public read" on testimonials for select using (is_published = true or auth.role() = 'authenticated');
create policy "testimonials admin write" on testimonials for insert with check (auth.role() = 'authenticated');
create policy "testimonials admin update" on testimonials for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "testimonials admin delete" on testimonials for delete using (auth.role() = 'authenticated');
