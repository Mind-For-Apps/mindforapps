// One-off data migration: seeds the "plugins" table (Bubble no-code plugin
// marketplace listings) from plugins-data.csv, uploads each plugin's logo
// to Storage, and links each plugin to its categories in the new
// "plugin_categories" lookup table (found-or-created by title — a
// different taxonomy than the "categories" table used for Templates).
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it). Run after 0014_plugins.sql.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-plugins.ts

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add SUPABASE_SERVICE_ROLE_KEY to .env.local temporarily and re-run.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Storage keys must be ASCII-safe.
function storageSafe(slug: string) {
  return slug.replace(/[^a-zA-Z0-9-]/g, "-");
}

// Bubble's list export separator is " , " (space-comma-space) — a plain ","
// split breaks list items that themselves contain a comma.
function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(" , ")
    .map((v) => v.trim())
    .filter(Boolean);
}

// Minimal RFC4180 CSV parser (handles quoted fields, embedded commas/
// newlines, and doubled "" escaped quotes) — plugins-data.csv has no
// pre-converted JSON counterpart like the other seed sources do.
function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\r") {
      // skip, handled by \n
    } else if (c === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const header = rows[0];
  return rows
    .slice(1)
    .filter((r) => r.some((v) => v.trim() !== ""))
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

async function uploadImage(bubbleUrl: string, path: string): Promise<string | null> {
  if (!bubbleUrl) return null;
  const url = bubbleUrl.startsWith("//") ? `https:${bubbleUrl}` : bubbleUrl;

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! failed to fetch ${url} (${res.status})`);
    return null;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") ?? "image/png";

  const { error } = await supabase.storage
    .from("case-study-media")
    .upload(path, buffer, { contentType, upsert: true });

  if (error) {
    console.warn(`  ! failed to upload ${path}: ${error.message}`);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("case-study-media").getPublicUrl(path);
  return publicUrl;
}

const categoryIdCache = new Map<string, string>();

async function getOrCreateCategoryId(title: string): Promise<string | null> {
  const cached = categoryIdCache.get(title);
  if (cached) return cached;

  const { data: existing } = await supabase
    .from("plugin_categories")
    .select("id")
    .eq("title", title)
    .maybeSingle();

  if (existing) {
    categoryIdCache.set(title, existing.id);
    return existing.id;
  }

  const { data: created, error } = await supabase
    .from("plugin_categories")
    .insert({ title })
    .select("id")
    .single();

  if (error || !created) {
    console.warn(`  ! failed to create category "${title}": ${error?.message}`);
    return null;
  }
  categoryIdCache.set(title, created.id);
  return created.id;
}

function toInt(value: string | undefined): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

async function main() {
  const csv = readFileSync(new URL("./plugins-data.csv", import.meta.url), "utf8");
  const rows = parseCsv(csv);

  console.log(`Seeding ${rows.length} plugins...`);
  for (const [i, row] of rows.entries()) {
    const name = row["Name"]?.trim();
    if (!name) continue;
    const slug = slugify(name);
    const storagePath = storageSafe(slug);
    console.log(`[${i + 1}/${rows.length}] ${name} (${slug})`);

    const logoUrl = await uploadImage(
      row["New image"] || row["Logo"],
      `plugins/${storagePath}/logo`,
    );

    const { data: plugin, error } = await supabase
      .from("plugins")
      .upsert(
        {
          slug,
          name,
          short_description: row["Short_description"] || null,
          description: row["Description"] || null,
          installation_steps: splitList(row["Installation Steps"]),
          demo_url: row["Demo_URL"] || null,
          editor_url: row["Editor_URL"] || null,
          market_url: row["Market_URL"] || null,
          logo_url: logoUrl,
          price_monthly: toInt(row["Price montly"]),
          price_one_time: toInt(row["Price one_time"]),
          seo_title: row["SEO_title"] || null,
          seo_description: row["SEO_description"] || null,
          sort_order: i,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();

    if (error || !plugin) {
      console.error(`  ! failed to save plugin: ${error?.message}`);
      continue;
    }

    const categoryTitles = splitList(row["Category"]);
    const categoryIds = (
      await Promise.all(categoryTitles.map((t) => getOrCreateCategoryId(t)))
    ).filter((id): id is string => !!id);

    await supabase.from("plugin_category_links").delete().eq("plugin_id", plugin.id);
    if (categoryIds.length > 0) {
      await supabase.from("plugin_category_links").insert(
        categoryIds.map((category_id) => ({ plugin_id: plugin.id, category_id })),
      );
    }

    console.log(`  ✓ saved (${categoryTitles.length} categories)`);
  }

  console.log("\nDone.");
}

main();
