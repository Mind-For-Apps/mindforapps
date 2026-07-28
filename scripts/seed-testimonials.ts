// One-off data migration: seeds the shared "testimonials" table from the
// client's real feedback (exported from the old Bubble.io app), re-uploading
// each client's photo to Storage.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it). Requires migration
// 0010_solution_detail_page.sql to have been run first.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-testimonials.ts

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
  const contentType = res.headers.get("content-type") ?? "image/jpeg";

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

type TestimonialRow = {
  name: string;
  role: string;
  company: string;
  quote: string;
  photo: string;
};

async function main() {
  const testimonials: TestimonialRow[] = JSON.parse(
    readFileSync(new URL("./testimonials-data.json", import.meta.url), "utf8"),
  );

  console.log(`Seeding ${testimonials.length} testimonials...`);
  for (const [i, t] of testimonials.entries()) {
    const ext = t.photo.split(".").pop()?.split("?")[0] ?? "jpg";
    const photoUrl = await uploadImage(
      t.photo,
      `testimonials/${slugify(t.name)}.${ext}`,
    );

    const { data: existing } = await supabase
      .from("testimonials")
      .select("id")
      .eq("name", t.name)
      .maybeSingle();

    const payload = {
      name: t.name,
      role: t.role,
      company: t.company,
      quote: t.quote,
      photo_url: photoUrl,
      sort_order: i,
    };

    const { error } = existing
      ? await supabase.from("testimonials").update(payload).eq("id", existing.id)
      : await supabase.from("testimonials").insert(payload);

    if (error) {
      console.error(`  ! failed to save testimonial "${t.name}": ${error.message}`);
      continue;
    }

    console.log(`  ✓ ${t.name}`);
  }

  console.log("\nDone.");
}

main();
