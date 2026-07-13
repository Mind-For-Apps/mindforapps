// One-off data migration: seeds the "Solution Features" categories + colored
// labels (exported from Bubble's New_1Solutions_Features / .../labels data
// types) and attaches them to the "real-estate" solution.
//
// NOTE: this exported set is Real Estate-specific content (property
// listings, mortgage calculators, agent CRM, etc.) — it is only linked to
// the "real-estate" solution. Other solutions (e.g. Service Booking) also
// reference a "Solution features" list in the main export, but their own
// category data hasn't been exported yet.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it).
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-solution-features.ts

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

const TARGET_SOLUTION_SLUG = "real-estate";

// Bubble's list export separator is " , " (space-comma-space) — a plain ","
// split breaks list items that themselves contain a comma.
function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(" , ")
    .map((v) => v.trim())
    .filter(Boolean);
}

type CategoryRow = { Category: string; images: string; labels: string; order: string };
type LabelRow = { title: string; color: string; "bg color": string };

async function main() {
  const categories: CategoryRow[] = JSON.parse(
    readFileSync(new URL("./solution-feature-categories-data.json", import.meta.url), "utf8"),
  );
  const labels: LabelRow[] = JSON.parse(
    readFileSync(new URL("./solution-feature-labels-data.json", import.meta.url), "utf8"),
  );

  const labelByTitle = new Map(labels.map((l) => [l.title.trim(), l]));

  const { data: solution, error: solutionError } = await supabase
    .from("solutions")
    .select("id")
    .eq("slug", TARGET_SOLUTION_SLUG)
    .maybeSingle();

  if (solutionError || !solution) {
    console.error(
      `! solution "${TARGET_SOLUTION_SLUG}" not found — run seed:solutions first.`,
    );
    process.exit(1);
  }

  // Clear existing categories for this solution (cascades to labels).
  await supabase
    .from("solution_feature_categories")
    .delete()
    .eq("solution_id", solution.id);

  console.log(`Seeding ${categories.length} feature categories for "${TARGET_SOLUTION_SLUG}"...`);
  for (const [i, cat] of categories.entries()) {
    const { data: category, error } = await supabase
      .from("solution_feature_categories")
      .insert({
        solution_id: solution.id,
        name: cat.Category,
        images: splitList(cat.images),
        sort_order: Number(cat.order) || i,
      })
      .select("id")
      .single();

    if (error || !category) {
      console.error(`  ! failed to insert category "${cat.Category}": ${error?.message}`);
      continue;
    }

    const titles = splitList(cat.labels);
    const rows = titles.map((title, idx) => {
      const label = labelByTitle.get(title);
      if (!label) {
        console.warn(`  ! no label match for "${title}" in category "${cat.Category}"`);
      }
      return {
        category_id: category.id,
        title,
        color: label?.color || null,
        bg_color: label?.["bg color"] || null,
        sort_order: idx,
      };
    });

    await supabase.from("solution_feature_labels").insert(rows);
    console.log(`  ✓ ${cat.Category} → ${rows.length} labels`);
  }

  console.log("\nDone.");
}

main();
