// One-off data migration: uploads tool icons to Storage and links them to
// the existing "tools" lookup rows (matched/created by name).
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it).
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-tools.ts

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

type ToolRow = { title: string; icon: string };

async function main() {
  const tools: ToolRow[] = JSON.parse(
    readFileSync(new URL("./tools-data.json", import.meta.url), "utf8"),
  );

  console.log(`Seeding ${tools.length} tool icons...`);
  for (const tool of tools) {
    const ext = tool.icon.split(".").pop()?.split("?")[0] || "svg";
    const iconUrl = await uploadImage(
      tool.icon,
      `tools/${slugify(tool.title)}.${ext}`,
    );

    const { data: existing } = await supabase
      .from("tools")
      .select("id")
      .eq("name", tool.title)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("tools")
        .update({ icon_url: iconUrl })
        .eq("id", existing.id);
      if (error) {
        console.error(`  ! failed to update "${tool.title}": ${error.message}`);
        continue;
      }
      console.log(`  ✓ ${tool.title} (updated)`);
    } else {
      const { error } = await supabase
        .from("tools")
        .insert({ name: tool.title, icon_url: iconUrl });
      if (error) {
        console.error(`  ! failed to insert "${tool.title}": ${error.message}`);
        continue;
      }
      console.log(`  ✓ ${tool.title} (created)`);
    }
  }

  console.log("\nDone.");
}

main();
