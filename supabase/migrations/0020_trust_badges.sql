-- Backs the "Certified Bubble agency partner / 50+ Platforms / ..." pill
-- carousel (src/components/sections/TrustCarousel.tsx), used on both the
-- homepage (inside Hero) and /solutions/[slug]. Previously a hardcoded
-- array with content that had drifted from the real Bubble source table —
-- this replaces it with a real, admin-editable table combining both.
-- Run in the Supabase SQL Editor.

create table trust_badges (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  description text,
  icon_url text,
  -- Which carousel(s) this pill shows in. Everything is seeded as 'both'
  -- for now, but kept per-row so index/solutions can diverge later.
  type text not null default 'both' check (type in ('index', 'solutions', 'both')),
  sort_order int not null default 0
);

alter table trust_badges enable row level security;

create policy "trust_badges public read" on trust_badges for select using (true);
create policy "trust_badges admin write" on trust_badges for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
