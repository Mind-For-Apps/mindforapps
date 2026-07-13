-- Adds the "Templates" + "Template Feature Tags" data from Bubble
-- (NEW_templates / NEW_Templates_Tags_Features), linked to the existing
-- "categories" table via a junction table. Run in the Supabase SQL Editor
-- (after 0005_categories.sql).

create table templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description_short text,
  description_long_1 text,
  description_long_2 text,
  images text[] not null default '{}',
  design_images text[] not null default '{}',
  -- Raw Bubble "New Images" entity refs — that lookup type hasn't been
  -- exported yet, so these can't be resolved to real image URLs until it is.
  new_images_refs text[] not null default '{}',
  demo_accounts_url text,
  demo_preview_url text,
  documentation_url text,
  shop_url text,
  platform_type text,
  user_roles text,
  price int,
  is_public boolean not null default true,
  seo_title text,
  seo_description text,
  seo_image_url text,
  youtube_video text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table template_categories (
  template_id uuid not null references templates (id) on delete cascade,
  category_id uuid not null references categories (id) on delete cascade,
  primary key (template_id, category_id)
);

create table template_feature_tags (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  created_at timestamptz not null default now()
);

create table template_features (
  template_id uuid not null references templates (id) on delete cascade,
  feature_tag_id uuid not null references template_feature_tags (id) on delete cascade,
  primary key (template_id, feature_tag_id)
);

create trigger templates_set_updated_at
  before update on templates
  for each row execute function set_updated_at();

alter table templates enable row level security;
alter table template_categories enable row level security;
alter table template_feature_tags enable row level security;
alter table template_features enable row level security;

create policy "templates public read" on templates for select using (is_public = true or auth.role() = 'authenticated');
create policy "templates admin write" on templates for insert with check (auth.role() = 'authenticated');
create policy "templates admin update" on templates for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "templates admin delete" on templates for delete using (auth.role() = 'authenticated');

create policy "template_categories public read" on template_categories for select using (true);
create policy "template_categories admin write" on template_categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "template_feature_tags public read" on template_feature_tags for select using (true);
create policy "template_feature_tags admin write" on template_feature_tags for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "template_features public read" on template_features for select using (true);
create policy "template_features admin write" on template_features for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
