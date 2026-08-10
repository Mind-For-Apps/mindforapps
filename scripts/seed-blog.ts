// One-off data migration: seeds the "blog_posts" table from the client's
// blog export (exported from the old Bubble.io app as a CSV,
// scripts/blog-import.csv), re-uploading each cover image to Storage
// (resized/compressed — the Bubble CDN originals are oversized) and
// converting Bubble's bracket-tag rich text into clean HTML.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it). Requires migration
// 0013_blog.sql to have been run first.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-blog.ts

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { parseCsv } from "./lib/parse-csv.ts";
import { convertBubbleRichText } from "./lib/parse-bubble-richtext.ts";

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

// Bubble list-export fields split on " , " (space-comma-space), not bare
// "," — list items can contain real commas. Same gotcha as every other
// seed script in this project.
function splitList(raw: string): string[] {
  return raw
    .split(" , ")
    .map((s) => s.trim())
    .filter(Boolean);
}

// "Jul 12, 2024 3:59 pm" -> ISO timestamp
function parseCreationDate(raw: string): string {
  const parsed = new Date(raw.trim());
  if (Number.isNaN(parsed.getTime())) {
    console.warn(`  ! could not parse date "${raw}", using now()`);
    return new Date().toISOString();
  }
  return parsed.toISOString();
}

async function uploadCoverImage(
  bubbleUrl: string,
  slug: string,
): Promise<string | null> {
  if (!bubbleUrl) return null;
  const url = bubbleUrl.startsWith("//") ? `https:${bubbleUrl}` : bubbleUrl;

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! failed to fetch ${url} (${res.status})`);
    return null;
  }
  const original = Buffer.from(await res.arrayBuffer());
  const compressed = await sharp(original)
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 80 })
    .toBuffer();

  const path = `blog/${slug}/cover.png`;
  const { error } = await supabase.storage
    .from("case-study-media")
    .upload(path, compressed, { contentType: "image/png", upsert: true });

  if (error) {
    console.warn(`  ! failed to upload ${path}: ${error.message}`);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("case-study-media").getPublicUrl(path);
  return publicUrl;
}

type BlogRow = {
  connectedTemplates: string;
  content: string;
  order: string;
  previewImage: string;
  title: string;
  creationDate: string;
};

async function main() {
  const csv = readFileSync(
    new URL("./blog-import.csv", import.meta.url),
    "utf8",
  );
  const [header, ...rows] = parseCsv(csv).filter((r) => r.length > 1 || r[0]);
  const col = (name: string) => header.indexOf(name);

  const posts: BlogRow[] = rows.map((r) => ({
    connectedTemplates: r[col("connected templates")] ?? "",
    content: r[col("content")] ?? "",
    order: r[col("order")] ?? "",
    previewImage: r[col("preview image")] ?? "",
    title: (r[col("title")] ?? "").trim(),
    creationDate: r[col("Creation Date")] ?? "",
  }));

  console.log(`Seeding ${posts.length} blog posts...`);

  for (const post of posts) {
    const slug = slugify(post.title);
    const publishedAt = parseCreationDate(post.creationDate);
    const coverImageUrl = await uploadCoverImage(post.previewImage, slug);
    const contentHtml = convertBubbleRichText(post.content);

    const payload = {
      slug,
      title: post.title,
      cover_image_url: coverImageUrl,
      content_html: contentHtml,
      connected_templates: splitList(post.connectedTemplates),
      sort_order: post.order ? Number(post.order) : 0,
      is_published: true,
      published_at: publishedAt,
    };

    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    const { error } = existing
      ? await supabase.from("blog_posts").update(payload).eq("id", existing.id)
      : await supabase.from("blog_posts").insert(payload);

    if (error) {
      console.error(`  ! failed to save "${post.title}": ${error.message}`);
      continue;
    }

    console.log(`  ✓ ${post.title}`);
  }

  console.log("\nDone.");
}

main();
