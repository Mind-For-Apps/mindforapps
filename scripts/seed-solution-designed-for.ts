// One-off data migration: seeds the per-solution "Designed For" (Who it's
// built for) child rows, replacing the old plain `designed_for text[]`
// column with real per-item icons + descriptions.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it). Requires migration
// 0015_solution_designed_for.sql to have been run first.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-solution-designed-for.ts

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

async function uploadImage(
  bubbleUrl: string,
  path: string,
): Promise<string | null> {
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

type ItemRow = { title: string; description: string; icon: string };

async function main() {
  const itemsBySlug: Record<string, ItemRow[]> = JSON.parse(
    readFileSync(
      new URL("./solution-designed-for-data.json", import.meta.url),
      "utf8",
    ),
  );

  console.log("Seeding solution designed-for ('Who it's built for')...");
  for (const [slug, items] of Object.entries(itemsBySlug)) {
    const { data: solution } = await supabase
      .from("solutions")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!solution) {
      console.warn(`  ! solution not found for slug "${slug}"`);
      continue;
    }

    await supabase
      .from("solution_designed_for")
      .delete()
      .eq("solution_id", solution.id);

    const rows = [];
    for (const [i, item] of items.entries()) {
      const iconUrl = await uploadImage(
        item.icon,
        `solutions/${slug}/designed-for/${i}.svg`,
      );
      rows.push({
        solution_id: solution.id,
        title: item.title,
        description: item.description || null,
        icon_url: iconUrl,
        sort_order: i,
      });
    }

    await supabase.from("solution_designed_for").insert(rows);
    console.log(`  ✓ ${slug} → ${rows.length} items`);
  }

  console.log("\nDone.");
}

main();
