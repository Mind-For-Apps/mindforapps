-- Free SEO Audit page's "Request your free audit" form submissions
-- (src/app/free-seo-audit/page.tsx, section id="request"). Same
-- public-insert / admin-only-read pattern as project_inquiries (0009) — no
-- file attachments on this form, so no Storage bucket needed.
-- Run in the Supabase SQL Editor.

create table audit_inquiries (
  id uuid primary key default gen_random_uuid(),
  website_url text not null,
  name text not null,
  email text not null,
  goal text not null,
  win text,
  markets text,
  competitors text,
  company_size text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table audit_inquiries enable row level security;

create policy "audit_inquiries public insert" on audit_inquiries for insert with check (true);
create policy "audit_inquiries admin read" on audit_inquiries for select using (auth.role() = 'authenticated');
create policy "audit_inquiries admin update" on audit_inquiries for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "audit_inquiries admin delete" on audit_inquiries for delete using (auth.role() = 'authenticated');
