-- Adds an optional white-fill variant icon for tools, so consumers that show
-- tool icons on a dark background (e.g. the case-study detail page's Tools
-- block) can use a properly white-colored asset instead of the regular
-- (usually dark/colored) icon_url.
-- Run in the Supabase SQL Editor.

alter table tools add column icon_white_url text;
