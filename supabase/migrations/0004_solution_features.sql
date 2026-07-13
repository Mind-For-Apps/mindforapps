-- Adds the "Solution Features" structure from Bubble: each solution has a
-- list of feature categories (New_1Solutions_Features), and each category
-- has a list of colored feature labels (New_1Solutions_Features/labels).
-- Run in the Supabase SQL Editor (after 0003_extend_solutions.sql).

create table solution_feature_categories (
  id uuid primary key default gen_random_uuid(),
  solution_id uuid not null references solutions (id) on delete cascade,
  name text not null,
  images text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table solution_feature_labels (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references solution_feature_categories (id) on delete cascade,
  title text not null,
  color text,
  bg_color text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table solution_feature_categories enable row level security;
alter table solution_feature_labels enable row level security;

create policy "solution_feature_categories public read" on solution_feature_categories for select using (true);
create policy "solution_feature_categories admin write" on solution_feature_categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "solution_feature_labels public read" on solution_feature_labels for select using (true);
create policy "solution_feature_labels admin write" on solution_feature_labels for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
