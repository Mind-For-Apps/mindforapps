// One-off data migration: uploads white-fill icon variants for two specific
// tools (Figma, Bubble.io) and sets tools.icon_white_url on the matching
// existing "tools" lookup rows.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it).
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-tools-icon-white.ts

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

const ITEMS: { name: string; localPath: string }[] = [
  { name: "Figma", localPath: "C:\\Users\\Asus\\Desktop\\111\\figma_w.svg" },
  { name: "Bubble.io", localPath: "C:\\Users\\Asus\\Desktop\\111\\bubble_w.svg" },
];

async function uploadLocalSvg(localPath: string, storagePath: string): Promise<string | null> {
  const buffer = readFileSync(localPath);

  const { error } = await supabase.storage
    .from("case-study-media")
    .upload(storagePath, buffer, { contentType: "image/svg+xml", upsert: true });

  if (error) {
    console.warn(`  ! failed to upload ${storagePath}: ${error.message}`);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("case-study-media").getPublicUrl(storagePath);
  return publicUrl;
}

async function main() {
  console.log(`Seeding ${ITEMS.length} tool white-icon variants...`);

  for (const item of ITEMS) {
    const { data: existing } = await supabase
      .from("tools")
      .select("id")
      .eq("name", item.name)
      .maybeSingle();

    if (!existing) {
      console.warn(`  ! no tool found with name "${item.name}", skipping`);
      continue;
    }

    const iconWhiteUrl = await uploadLocalSvg(
      item.localPath,
      `tools/${slugify(item.name)}-white.svg`,
    );
    if (!iconWhiteUrl) continue;

    const { error } = await supabase
      .from("tools")
      .update({ icon_white_url: iconWhiteUrl })
      .eq("id", existing.id);

    if (error) {
      console.error(`  ! failed to update "${item.name}": ${error.message}`);
      continue;
    }
    console.log(`  ✓ ${item.name}`);
  }

  console.log("\nDone.");
}

main();
