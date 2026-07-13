-- Extends the "solutions" table with the real fields from the Bubble
-- "NEW Solutions" data type, and adds a solution_tools junction table
-- (mirrors case_study_tools). Run in the Supabase SQL Editor.

alter table solutions
  add column if not exists slug text unique,
  add column if not exists main_image_url text,
  add column if not exists features_image_url text,
  add column if not exists images text[] not null default '{}',
  add column if not exists images_cover text[] not null default '{}',
  add column if not exists designed_for text[] not null default '{}',
  add column if not exists with_mfa text[] not null default '{}',
  add column if not exists without_mfa text[] not null default '{}',
  add column if not exists whats_included_icon_url text,
  add column if not exists title_long text,
  add column if not exists title_for_cards text,
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists text_0 text,
  add column if not exists text_1 text,
  add column if not exists text_2 text,
  add column if not exists text_3 text,
  add column if not exists text_4 text,
  add column if not exists text_5 text,
  add column if not exists text_6 text, -- Bubble label: "what problem"
  add column if not exists text_7 text, -- Bubble label: "you need"
  add column if not exists text_8 text;

create table solution_tools (
  solution_id uuid not null references solutions (id) on delete cascade,
  tool_id uuid not null references tools (id) on delete cascade,
  primary key (solution_id, tool_id)
);

alter table solution_tools enable row level security;

create policy "solution_tools public read" on solution_tools for select using (true);
create policy "solution_tools admin write" on solution_tools for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
