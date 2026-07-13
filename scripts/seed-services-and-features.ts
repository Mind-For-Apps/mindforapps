// One-off data migration: seeds the "services" lookup table and the
// per-case-study "Key Features Delivered" child rows, then links case
// studies to their services.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it).
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-services-and-features.ts

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

function splitList(value: string | undefined): string[] {
  if (!value) return [];
  // Bubble's list export separator is " , " (space-comma-space) — a plain
  // "," split breaks list items that themselves contain a comma.
  return value
    .split(" , ")
    .map((v) => v.trim())
    .filter(Boolean);
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type ServiceRow = {
  uniqueId: string;
  title: string;
  description: string;
  icon: string;
  picture: string;
  tags: string;
  whatsIncluded: string;
};

type FeatureRow = { title: string; icon: string };

async function seedServices() {
  const services: ServiceRow[] = JSON.parse(
    readFileSync(new URL("./services-data.json", import.meta.url), "utf8"),
  );

  const idMap = new Map<string, string>();

  console.log(`Seeding ${services.length} services...`);
  for (const service of services) {
    const slug = slugify(service.title);
    const [iconUrl, pictureUrl] = await Promise.all([
      uploadImage(service.icon, `services/${slug}/icon.svg`),
      uploadImage(service.picture, `services/${slug}/picture.jpg`),
    ]);

    const { data: existing } = await supabase
      .from("services")
      .select("id")
      .eq("name", service.title)
      .maybeSingle();

    const payload = {
      name: service.title,
      description: service.description,
      icon_url: iconUrl,
      picture_url: pictureUrl,
      tags: splitList(service.tags),
      whats_included: splitList(service.whatsIncluded),
    };

    const { data, error } = existing
      ? await supabase
          .from("services")
          .update(payload)
          .eq("id", existing.id)
          .select("id")
          .single()
      : await supabase.from("services").insert(payload).select("id").single();

    if (error || !data) {
      console.error(`  ! failed to save service "${service.title}": ${error?.message}`);
      continue;
    }

    idMap.set(service.uniqueId, data.id);
    console.log(`  ✓ ${service.title}`);
  }

  return idMap;
}

async function linkCaseStudyServices(serviceIdMap: Map<string, string>) {
  const raw: Record<string, string>[] = JSON.parse(
    readFileSync(new URL("./case-studies-data.json", import.meta.url), "utf8"),
  );

  console.log("\nLinking case studies to services...");
  for (const item of raw) {
    const slug = item["Slug"];
    const bubbleServiceIds = splitList(item["services"]);
    const serviceIds = bubbleServiceIds
      .map((id) => serviceIdMap.get(id))
      .filter((id): id is string => !!id);

    if (serviceIds.length === 0) continue;

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
      .from("case_study_services")
      .delete()
      .eq("case_study_id", caseStudy.id);
    await supabase.from("case_study_services").insert(
      serviceIds.map((service_id) => ({
        case_study_id: caseStudy.id,
        service_id,
      })),
    );
    console.log(`  ✓ ${slug} → ${serviceIds.length} services`);
  }
}

async function seedKeyFeatures() {
  const featuresBySlug: Record<string, FeatureRow[]> = JSON.parse(
    readFileSync(new URL("./key-features-data.json", import.meta.url), "utf8"),
  );

  console.log("\nSeeding key features...");
  for (const [slug, features] of Object.entries(featuresBySlug)) {
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
      .from("case_study_key_features")
      .delete()
      .eq("case_study_id", caseStudy.id);

    const rows = [];
    for (const [i, feature] of features.entries()) {
      const iconUrl = await uploadImage(
        feature.icon,
        `case-studies/${slug}/features/${i}.svg`,
      );
      rows.push({
        case_study_id: caseStudy.id,
        label: feature.title,
        icon_url: iconUrl,
        sort_order: i,
      });
    }

    await supabase.from("case_study_key_features").insert(rows);
    console.log(`  ✓ ${slug} → ${rows.length} features`);
  }
}

async function main() {
  const serviceIdMap = await seedServices();
  await linkCaseStudyServices(serviceIdMap);
  await seedKeyFeatures();
  console.log("\nDone.");
}

main();
