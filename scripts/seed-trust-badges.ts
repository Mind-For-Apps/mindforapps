// One-off data migration: seeds the `trust_badges` table (backs
// TrustCarousel on the homepage + /solutions/[slug]) by combining the real
// Bubble source table's content with the extra pills the current site had
// added, uploading local icon files to Storage. Upserts by `text` (natural
// key), so re-running this script is safe.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it).
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-trust-badges.ts

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add SUPABASE_SERVICE_ROLE_KEY to .env.local temporarily and re-run.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

type BadgeRow = {
  text: string;
  description: string | null;
  localIcon: string | null;
};

const BADGES: BadgeRow[] = [
  { text: "Certified Bubble agency partner", description: null, localIcon: "bubble-cert.svg" },
  { text: "Bubble Certified Agency", description: "8+ Years", localIcon: null },
  { text: "Platforms Launched", description: "50+ Platforms", localIcon: null },
  { text: "50+", description: "apps created", localIcon: "badges/apps-created.svg" },
  {
    text: "Businesses served worldwide",
    description: "HealthTech, Real Estate, Ed Tech",
    localIcon: "badges/worldwide-startups.svg",
  },
  {
    text: "5x – 10x faster development",
    description: "than traditional coding",
    localIcon: "badges/faster-development.svg",
  },
  { text: "Starting from", description: "$1,500", localIcon: null },
  { text: "Average delivery time", description: "4 Weeks", localIcon: null },
  { text: "Full client ownership", description: null, localIcon: "badges/client-ownership.svg" },
  { text: "65%", description: "cheaper than custom dev", localIcon: null },
  {
    text: "Post-launch",
    description: "support included",
    localIcon: "badges/post-launch-support.svg",
  },
  { text: "NDA-friendly", description: null, localIcon: "badges/nda-friendly.svg" },
  { text: "Fixed-price projects", description: null, localIcon: "badges/fixed-price.svg" },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uploadIcon(localIcon: string, slug: string): Promise<string | null> {
  const localPath = join(process.cwd(), "public", "images", localIcon);
  const buffer = readFileSync(localPath);
  const storagePath = `trust-badges/${slug}.svg`;

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
  console.log(`Seeding ${BADGES.length} trust badges...`);

  for (const [i, badge] of BADGES.entries()) {
    const slug = slugify(badge.text);
    const iconUrl = badge.localIcon ? await uploadIcon(badge.localIcon, slug) : null;

    const { data: existing } = await supabase
      .from("trust_badges")
      .select("id")
      .eq("text", badge.text)
      .maybeSingle();

    const fields = {
      text: badge.text,
      description: badge.description,
      icon_url: iconUrl,
      type: "both",
      sort_order: i + 1,
    };

    if (existing) {
      const { error } = await supabase
        .from("trust_badges")
        .update(fields)
        .eq("id", existing.id);
      if (error) {
        console.error(`  ! failed to update "${badge.text}": ${error.message}`);
        continue;
      }
      console.log(`  ✓ ${badge.text} (updated)`);
    } else {
      const { error } = await supabase.from("trust_badges").insert(fields);
      if (error) {
        console.error(`  ! failed to insert "${badge.text}": ${error.message}`);
        continue;
      }
      console.log(`  ✓ ${badge.text} (created)`);
    }
  }

  console.log("\nDone.");
}

main();
