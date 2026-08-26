-- Adds the "Plugins" data (Bubble no-code plugin marketplace listings),
-- with its own category lookup table (a different taxonomy than the
-- "categories" table used for Templates). Run in the Supabase SQL Editor
-- after 0013.

create table plugins (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  installation_steps text[] not null default '{}',
  demo_url text,
  editor_url text,
  market_url text,
  logo_url text,
  price_monthly int,
  price_one_time int,
  seo_title text,
  seo_description text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table plugin_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  created_at timestamptz not null default now()
);

create table plugin_category_links (
  plugin_id uuid not null references plugins (id) on delete cascade,
  category_id uuid not null references plugin_categories (id) on delete cascade,
  primary key (plugin_id, category_id)
);

create trigger plugins_set_updated_at
  before update on plugins
  for each row execute function set_updated_at();

alter table plugins enable row level security;
alter table plugin_categories enable row level security;
alter table plugin_category_links enable row level security;

create policy "plugins public read" on plugins for select using (is_public = true or auth.role() = 'authenticated');
create policy "plugins admin insert" on plugins for insert with check (auth.role() = 'authenticated');
create policy "plugins admin update" on plugins for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "plugins admin delete" on plugins for delete using (auth.role() = 'authenticated');

create policy "plugin_categories public read" on plugin_categories for select using (true);
create policy "plugin_categories admin write" on plugin_categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "plugin_category_links public read" on plugin_category_links for select using (true);
create policy "plugin_category_links admin write" on plugin_category_links for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
