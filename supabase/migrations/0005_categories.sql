-- Adds the "Categories" lookup table (Bubble "NEW_categories" data type),
-- used to filter the Templates section. Run in the Supabase SQL Editor.

create table categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  short_title text not null,
  icon_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;

create policy "categories public read" on categories for select using (true);
create policy "categories admin write" on categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
