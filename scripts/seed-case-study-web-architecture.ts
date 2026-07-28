// One-off data migration: seeds the per-case-study "What Was Built"
// (case_study_web_architecture) child rows, replacing the old plain
// `web_architecture text[]` column with real per-item icons.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it). Requires migration
// 0008_case_study_web_architecture.sql to have been run first.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-case-study-web-architecture.ts

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

type ItemRow = { title: string; icon: string };

async function main() {
  const itemsBySlug: Record<string, ItemRow[]> = JSON.parse(
    readFileSync(
      new URL("./web-architecture-data.json", import.meta.url),
      "utf8",
    ),
  );

  console.log("Seeding case study web architecture ('What Was Built')...");
  for (const [slug, items] of Object.entries(itemsBySlug)) {
    const { data: caseStudy } = await supabase
      .from("case_studies")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!caseStudy) {
      console.warn(`  ! case study not found for slug "${slug}"`);
      continue;
    }

    await supabase
      .from("case_study_web_architecture")
      .delete()
      .eq("case_study_id", caseStudy.id);

    const rows = [];
    for (const [i, item] of items.entries()) {
      const iconUrl = await uploadImage(
        item.icon,
        `case-studies/${slug}/web-architecture/${i}.svg`,
      );
      rows.push({
        case_study_id: caseStudy.id,
        label: item.title,
        icon_url: iconUrl,
        sort_order: i,
      });
    }

    await supabase.from("case_study_web_architecture").insert(rows);
    console.log(`  ✓ ${slug} → ${rows.length} items`);
  }

  console.log("\nDone.");
}

main();
