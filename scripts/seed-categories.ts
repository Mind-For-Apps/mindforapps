// One-off data migration: uploads category icons to Storage and seeds the
// "categories" lookup table (used to filter the Templates section).
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it).
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-categories.ts

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

async function uploadImage(bubbleUrl: string, path: string): Promise<string | null> {
  if (!bubbleUrl) return null;
  const url = bubbleUrl.startsWith("//") ? `https:${bubbleUrl}` : bubbleUrl;

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! failed to fetch ${url} (${res.status})`);
    return null;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") ?? "image/svg+xml";

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

type CategoryRow = { icon: string; "short title": string; title: string };

async function main() {
  const categories: CategoryRow[] = JSON.parse(
    readFileSync(new URL("./categories-data.json", import.meta.url), "utf8"),
  );

  console.log(`Seeding ${categories.length} categories...`);
  for (const [i, cat] of categories.entries()) {
    const iconUrl = await uploadImage(
      cat.icon,
      `categories/${slugify(cat["short title"])}.svg`,
    );

    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("title", cat.title)
      .maybeSingle();

    const payload = {
      title: cat.title,
      short_title: cat["short title"],
      icon_url: iconUrl,
      sort_order: i,
    };

    const { error } = existing
      ? await supabase.from("categories").update(payload).eq("id", existing.id)
      : await supabase.from("categories").insert(payload);

    if (error) {
      console.error(`  ! failed to save "${cat.title}": ${error.message}`);
      continue;
    }
    console.log(`  ✓ ${cat.title}`);
  }

  console.log("\nDone.");
}

main();
