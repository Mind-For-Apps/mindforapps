-- Blog posts, imported from the old Bubble.io app's blog export.
-- Run in the Supabase SQL Editor after 0012.

create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  cover_image_url text,
  content_html text not null,
  connected_templates text[] not null default '{}',
  sort_order int not null default 0,
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table blog_posts enable row level security;

create policy "blog_posts public read" on blog_posts for select using (is_published = true or auth.role() = 'authenticated');
create policy "blog_posts admin insert" on blog_posts for insert with check (auth.role() = 'authenticated');
create policy "blog_posts admin update" on blog_posts for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "blog_posts admin delete" on blog_posts for delete using (auth.role() = 'authenticated');

create trigger blog_posts_set_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();
