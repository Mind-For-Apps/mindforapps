// One-off data migration: seeds "template_feature_tags", uploads template
// images to Storage, and inserts/updates "templates" rows, linking each to
// its categories (matched by title against the existing "categories" table)
// and feature tags.
//
// The "new images" field holds refs into Bubble's "New Images" type, which
// turned out to be just a plain image wrapper (image + unused alt text) —
// resolved via new-images-data.json rather than a separate table.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it).
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-templates.ts

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

// Storage keys must be ASCII-safe — some source slugs contain look-alike
// non-Latin characters (e.g. a Cyrillic "с" instead of Latin "c") that
// Supabase Storage rejects as an "Invalid key".
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

type TemplateRow = Record<string, string>;
type FeatureTagRow = { title: string; "unique id": string };
type NewImageRow = { image: string; "unique id": string };

function loadNewImagesMap(): Map<string, string> {
  const rows: NewImageRow[] = JSON.parse(
    readFileSync(new URL("./new-images-data.json", import.meta.url), "utf8"),
  );
  return new Map(rows.map((r) => [r["unique id"], r.image]));
}

async function seedFeatureTags(): Promise<Map<string, string>> {
  const rows: FeatureTagRow[] = JSON.parse(
    readFileSync(new URL("./template-feature-tags-data.json", import.meta.url), "utf8"),
  );

  const idMap = new Map<string, string>();
  console.log(`Seeding ${rows.length} template feature tags...`);
  for (const row of rows) {
    const { data: existing } = await supabase
      .from("template_feature_tags")
      .select("id")
      .eq("title", row.title)
      .maybeSingle();

    if (existing) {
      idMap.set(row["unique id"], existing.id);
      continue;
    }

    const { data: created, error } = await supabase
      .from("template_feature_tags")
      .insert({ title: row.title })
      .select("id")
      .single();

    if (error || !created) {
      console.warn(`  ! failed to create feature tag "${row.title}": ${error?.message}`);
      continue;
    }
    idMap.set(row["unique id"], created.id);
  }
  console.log(`  ✓ ${idMap.size} feature tags ready`);
  return idMap;
}

async function main() {
  const templates: TemplateRow[] = JSON.parse(
    readFileSync(new URL("./templates-data.json", import.meta.url), "utf8"),
  );

  const featureTagIdMap = await seedFeatureTags();
  const newImagesMap = loadNewImagesMap();

  console.log(`\nSeeding ${templates.length} templates...`);
  for (const [i, item] of templates.entries()) {
    const slug = item["Slug"];
    const title = item["title"]?.trim();
    const storagePath = storageSafe(slug);
    console.log(`[${i + 1}/${templates.length}] ${title} (${slug})`);

    const imageUrls = splitList(item["images"]);
    const images = (
      await Promise.all(
        imageUrls.map((u, idx) => uploadImage(u, `templates/${storagePath}/images/${idx}.jpg`)),
      )
    ).filter((u): u is string => !!u);

    const designImageUrls = splitList(item["design images"]);
    const designImages = (
      await Promise.all(
        designImageUrls.map((u, idx) =>
          uploadImage(u, `templates/${storagePath}/design/${idx}.jpg`),
        ),
      )
    ).filter((u): u is string => !!u);

    const newImageUrls = splitList(item["new images"])
      .map((uid) => newImagesMap.get(uid))
      .filter((u): u is string => !!u);
    const newImages = (
      await Promise.all(
        newImageUrls.map((u, idx) =>
          uploadImage(u, `templates/${storagePath}/new-images/${idx}.jpg`),
        ),
      )
    ).filter((u): u is string => !!u);

    const seoImageUrl = await uploadImage(
      item["SEO - image"],
      `templates/${storagePath}/seo.jpg`,
    );

    const { data: template, error } = await supabase
      .from("templates")
      .upsert(
        {
          slug,
          title,
          description_short: item["descriptiom short"] || null,
          description_long_1: item["description long 1"] || null,
          description_long_2: item["description long 2"] || null,
          images,
          design_images: designImages,
          new_images: newImages,
          demo_accounts_url: item["link - demo accounts"] || null,
          demo_preview_url: item["link - demo preview"] || null,
          documentation_url: item["link - documentation"] || null,
          shop_url: item["link - shop"] || null,
          platform_type: item["Platform type"] || null,
          user_roles: item["User roles"] || null,
          price: item["price"] ? Number(item["price"]) : null,
          is_public: item["public"]?.trim().toLowerCase() === "yes",
          seo_title: item["SEO - title"] || null,
          seo_description: item["SEO - description"] || null,
          seo_image_url: seoImageUrl,
          youtube_video: item["youtube video"] || null,
          sort_order: Number(item["order"]) || i,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();

    if (error || !template) {
      console.error(`  ! failed to save template: ${error?.message}`);
      continue;
    }

    const categoryTitles = splitList(item["Category"]);
    if (categoryTitles.length > 0) {
      const { data: categories } = await supabase
        .from("categories")
        .select("id, title")
        .in("title", categoryTitles);

      await supabase.from("template_categories").delete().eq("template_id", template.id);
      if (categories && categories.length > 0) {
        await supabase.from("template_categories").insert(
          categories.map((c) => ({ template_id: template.id, category_id: c.id })),
        );
      }
      const missing = categoryTitles.filter(
        (t) => !categories?.some((c) => c.title === t),
      );
      if (missing.length > 0) {
        console.warn(`  ! no category match for: ${missing.join(", ")}`);
      }
    }

    const featureUids = splitList(item["Features"]);
    if (featureUids.length > 0) {
      const featureTagIds = featureUids
        .map((uid) => featureTagIdMap.get(uid))
        .filter((id): id is string => !!id);

      await supabase.from("template_features").delete().eq("template_id", template.id);
      if (featureTagIds.length > 0) {
        await supabase.from("template_features").insert(
          featureTagIds.map((feature_tag_id) => ({
            template_id: template.id,
            feature_tag_id,
          })),
        );
      }
    }

    console.log(
      `  ✓ saved (${images.length} images, ${designImages.length} design images, ${newImages.length} new images, ${categoryTitles.length} categories, ${featureUids.length} features)`,
    );
  }

  console.log("\nDone.");
}

main();
