-- Adds a third per-page FAQ ordering column, mirroring real_estate_sort_order
-- (0011) and service_booking_sort_order (0016), so the Free SEO Audit page
-- can show its own curated "Good to know" FAQ subset.
-- Run in the Supabase SQL Editor after 0016.

alter table faqs add column free_seo_audit_sort_order int;
