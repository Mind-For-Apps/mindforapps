-- "Start Your Project" footer form submissions. Public (anonymous) visitors
-- can create rows and upload attachments; only the authenticated admin can
-- read/manage them. Run in the Supabase SQL Editor after 0008.

create table project_inquiries (
  id uuid primary key default gen_random_uuid(),
  stage text not null,
  budget text,
  name text not null,
  email text not null,
  project_title text,
  message text,
  -- Storage paths within the private project-inquiry-files bucket, not
  -- public URLs — resolve to signed URLs on read (see admin inquiries page).
  file_paths text[] not null default '{}',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table project_inquiries enable row level security;

create policy "project_inquiries public insert" on project_inquiries for insert with check (true);
create policy "project_inquiries admin read" on project_inquiries for select using (auth.role() = 'authenticated');
create policy "project_inquiries admin update" on project_inquiries for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "project_inquiries admin delete" on project_inquiries for delete using (auth.role() = 'authenticated');

-- Private bucket: attachments may include client briefs/NDAs, so unlike
-- case-study-media this is not publicly readable — only admin can view them
-- (via signed URLs generated server-side).
insert into storage.buckets (id, name, public)
values ('project-inquiry-files', 'project-inquiry-files', false)
on conflict (id) do nothing;

create policy "project-inquiry-files public upload"
  on storage.objects for insert
  with check (bucket_id = 'project-inquiry-files');

create policy "project-inquiry-files admin read"
  on storage.objects for select
  using (bucket_id = 'project-inquiry-files' and auth.role() = 'authenticated');

create policy "project-inquiry-files admin delete"
  on storage.objects for delete
  using (bucket_id = 'project-inquiry-files' and auth.role() = 'authenticated');
