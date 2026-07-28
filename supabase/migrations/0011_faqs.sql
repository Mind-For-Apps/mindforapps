-- Adds a shared FAQ table, used in three places:
--   1. A standalone /faq page — every row.
--   2. The homepage — only rows with show_on_index = true.
--   3. The Real Estate solution detail page only — rows where
--      real_estate_sort_order is set, ordered by that number.
-- Run in the Supabase SQL Editor after 0010.

create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  show_on_index boolean not null default false,
  real_estate_sort_order int,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table faqs enable row level security;

create policy "faqs public read" on faqs for select using (true);
create policy "faqs admin write" on faqs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
