-- The "new images" field on templates originally stored raw, unresolved
-- Bubble "New Images" entity refs (that lookup type hadn't been exported).
-- It turns out that type is just a plain image wrapper (image + unused alt
-- text), so there's no need for a separate table — rename the column to
-- reflect that it now holds resolved image URLs directly.
-- Run in the Supabase SQL Editor (after 0006_templates.sql).

alter table templates rename column new_images_refs to new_images;
