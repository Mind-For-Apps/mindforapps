-- Extends the "services" lookup table with the real fields from the
-- Bubble "NEW_Services for indexs" data type. Run in the Supabase SQL Editor.

alter table services
  add column if not exists description text,
  add column if not exists picture_url text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists whats_included text[] not null default '{}';
