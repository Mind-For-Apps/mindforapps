// One-off data migration: imports the 5 industry solutions (exported from
// the old Bubble.io app) into Supabase, re-uploading their images to
// Supabase Storage and linking each solution to its tools.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it).
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-solutions.ts

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

type RawSolution = Record<string, string>;

function splitList(value: string | undefined): string[] {
  if (!value) return [];
  // Bubble's list export separator is " , " (space-comma-space) — a plain
  // "," split breaks list items that themselves contain a comma (e.g.
  // "Predictable, fixed pricing" is one item, not two).
  return value
    .split(" , ")
    .map((v) => v.trim())
    .filter(Boolean);
}

// tags_text embeds the "+N more" count as a trailing pseudo-tag, e.g.
// "Listings , CRM , Analytics , Admin Dashboard , +8" — split it out so the
// existing `tags` + `more_count` columns (already used by Solutions.tsx)
// keep working as-is.
function splitTagsWithMoreCount(value: string | undefined): {
  tags: string[];
  moreCount: number;
} {
  const items = splitList(value);
  const last = items[items.length - 1];
  const match = last?.match(/^\+(\d+)$/);
  if (match) {
    return { tags: items.slice(0, -1), moreCount: Number(match[1]) };
  }
  return { tags: items, moreCount: 0 };
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

async function getOrCreateTools(names: string[], cache: Map<string, string>): Promise<string[]> {
  const ids: string[] = [];
  for (const name of names) {
    if (cache.has(name)) {
      ids.push(cache.get(name)!);
      continue;
    }
    const { data: existing } = await supabase
      .from("tools")
      .select("id")
      .eq("name", name)
      .maybeSingle();

    if (existing) {
      cache.set(name, existing.id);
      ids.push(existing.id);
      continue;
    }

    const { data: created, error } = await supabase
      .from("tools")
      .insert({ name })
      .select("id")
      .single();

    if (error || !created) {
      console.warn(`  ! failed to create tool "${name}": ${error?.message}`);
      continue;
    }
    cache.set(name, created.id);
    ids.push(created.id);
  }
  return ids;
}

async function main() {
  const raw: RawSolution[] = JSON.parse(
    readFileSync(new URL("./solutions-data.json", import.meta.url), "utf8"),
  );

  const toolCache = new Map<string, string>();

  for (const [i, item] of raw.entries()) {
    const slug = item["Slug"];
    const title = item["title main"]?.trim();
    console.log(`[${i + 1}/${raw.length}] ${title} (${slug})`);

    const [mainImageUrl, featuresImageUrl, whatsIncludedIconUrl] = await Promise.all([
      uploadImage(item["main image"], `solutions/${slug}/main.png`),
      uploadImage(item["Features image_temporary"], `solutions/${slug}/features.png`),
      uploadImage(item["What’s included"], `solutions/${slug}/whats-included-icon.svg`),
    ]);

    const imageUrls = splitList(item["Images"]);
    const images = (
      await Promise.all(
        imageUrls.map((u, idx) => uploadImage(u, `solutions/${slug}/images/${idx}.png`)),
      )
    ).filter((u): u is string => !!u);

    const coverUrls = splitList(item["images_cover"]);
    const imagesCover = (
      await Promise.all(
        coverUrls.map((u, idx) => uploadImage(u, `solutions/${slug}/cover/${idx}.png`)),
      )
    ).filter((u): u is string => !!u);

    const { tags, moreCount } = splitTagsWithMoreCount(item["tags_text"]);
    const startingAt = item["Starting at"]?.trim();

    const { data: solution, error } = await supabase
      .from("solutions")
      .upsert(
        {
          slug,
          title,
          price_label: startingAt ? `Starting at ${startingAt}` : null,
          is_estimate_link: item["get estimation"]?.trim().toLowerCase() === "yes",
          tags,
          more_count: moreCount,
          main_image_url: mainImageUrl,
          features_image_url: featuresImageUrl,
          whats_included_icon_url: whatsIncludedIconUrl,
          images,
          images_cover: imagesCover,
          designed_for: splitList(item["Designed for"]),
          with_mfa: splitList(item["with MFA"]),
          without_mfa: splitList(item["without MFA"]),
          title_long: item["title long"] || null,
          title_for_cards: item["title for cards"] || null,
          seo_title: item["SEO_title"] || null,
          seo_description: item["SEO_desctiption"] || null,
          text_0: item["text 0"] || null,
          text_1: item["text 1"] || null,
          text_2: item["text 2"] || null,
          text_3: item["text 3"] || null,
          text_4: item["text 4"] || null,
          text_5: item["text 5"] || null,
          text_6: item["text 6 (what problem)"] || null,
          text_7: item["text 7 (you need)"] || null,
          text_8: item["text 8"] || null,
          is_published: true,
          sort_order: i,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();

    if (error || !solution) {
      console.error(`  ! failed to save solution: ${error?.message}`);
      continue;
    }

    const toolNames = splitList(item["Options"]);
    const toolIds = await getOrCreateTools(toolNames, toolCache);

    await supabase.from("solution_tools").delete().eq("solution_id", solution.id);
    if (toolIds.length > 0) {
      await supabase
        .from("solution_tools")
        .insert(toolIds.map((tool_id) => ({ solution_id: solution.id, tool_id })));
    }

    console.log(`  ✓ saved (${images.length} images, ${imagesCover.length} cover, ${toolIds.length} tools)`);
  }

  console.log(
    "\nDone. NOTE: 'Solution features' (numeric ids) were not seeded — that " +
      "references a separate Bubble table not yet exported.",
  );
}

main();
