alter table testimonials
  add column if not exists project_image_url text,
  add column if not exists project_logo_url text;
