-- Replaces the plain `designed_for text[]` column on solutions with a proper
-- per-solution child table (same shape/reasoning as case_study_web_architecture,
-- see 0008), so the "Who it's built for" cards can show a real per-item icon
-- and description instead of cycling a generic static icon with no description.
-- Run in the Supabase SQL Editor after 0014.

create table solution_designed_for (
  id uuid primary key default gen_random_uuid(),
  solution_id uuid not null references solutions (id) on delete cascade,
  icon_url text,
  title text not null,
  description text,
  sort_order int not null default 0
);

alter table solution_designed_for enable row level security;

create policy "solution_designed_for public read" on solution_designed_for for select using (true);
create policy "solution_designed_for admin write" on solution_designed_for for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- designed_for is currently only populated for real-estate and
-- service-booking-platform (checked scripts/solutions-data.json) — the other
-- three solutions already render nothing for this block, so dropping the
-- column loses no visible content. Run scripts/seed-solution-designed-for.ts
-- any time after this migration to populate the new table for those two.
alter table solutions drop column designed_for;
