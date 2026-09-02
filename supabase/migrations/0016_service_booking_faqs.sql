-- Adds a second per-solution FAQ ordering column, mirroring real_estate_sort_order
-- (0011), so the Service Booking solution page can show its own curated FAQ
-- subset instead of none at all.
-- Run in the Supabase SQL Editor after 0015.

alter table faqs add column service_booking_sort_order int;
